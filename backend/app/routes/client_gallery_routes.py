from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.controllers.client_gallery_controller import (
    create_gallery,
    get_gallery_by_slug,
    add_photos_to_gallery,
    set_gallery_cover,
    delete_photo_from_gallery,
    delete_gallery
)
from app.schemas.client_gallery import ClientGalleryCreate, ClientGalleryResponse
from app.auth.admin import admin_auth
from app.models.client_gallery import ClientGallery

from app.models.liked_photo import LikedPhoto

from fastapi.responses import FileResponse, StreamingResponse
import zipfile
import io
from pathlib import Path
from app.models.client_photo import ClientPhoto




router = APIRouter(prefix="/api/client-galleries", tags=["Client Galleries"])
UPLOADS_DIR = Path(__file__).resolve().parents[2] / "uploads"


# ---------------------------------------------------------
# Создание галереи
# ---------------------------------------------------------
@router.post("/", response_model=ClientGalleryResponse)
def create_client_gallery(
    data: ClientGalleryCreate,
    db: Session = Depends(get_db),
    authorized: bool = Depends(admin_auth)
):
    return create_gallery(db, data)


# ---------------------------------------------------------
# Получение всех галерей (сортировка по дате съёмки)
# ---------------------------------------------------------
@router.get("/", response_model=list[ClientGalleryResponse])
def get_all_galleries(
    db: Session = Depends(get_db),
    authorized: bool = Depends(admin_auth)
):
    galleries = (
        db.query(ClientGallery)
        .order_by(ClientGallery.event_date.desc())
        .all()
    )
    return galleries


# ---------------------------------------------------------
# Получение галереи по slug
# ---------------------------------------------------------
@router.get("/{slug}", response_model=ClientGalleryResponse)
def get_client_gallery(slug: str, db: Session = Depends(get_db)):
    return get_gallery_by_slug(db, slug)

# ---------------------------------------------------------
# Получение списка лайкнутых фото
# ---------------------------------------------------------
@router.get("/{slug}/likes")
def get_likes(slug: str, db: Session = Depends(get_db)):
    gallery = db.query(ClientGallery).filter(ClientGallery.slug == slug).first()
    if not gallery:
        return {"error": "Gallery not found"}

    liked = (
        db.query(LikedPhoto.photo_id)
        .filter(LikedPhoto.gallery_id == gallery.id)
        .all()
    )

    return [row[0] for row in liked]

# ---------------------------------------------------------
# Лайк / анлайк фото
# ---------------------------------------------------------
@router.post("/{slug}/toggle-like/{photo_id}")
def toggle_like(slug: str, photo_id: int, db: Session = Depends(get_db)):
    gallery = db.query(ClientGallery).filter(ClientGallery.slug == slug).first()
    if not gallery:
        return {"error": "Gallery not found"}

    existing = (
        db.query(LikedPhoto)
        .filter(
            LikedPhoto.gallery_id == gallery.id,
            LikedPhoto.photo_id == photo_id
        )
        .first()
    )

    if existing:
        db.delete(existing)
        db.commit()
        return {"status": "unliked"}

    new_like = LikedPhoto(gallery_id=gallery.id, photo_id=photo_id)
    db.add(new_like)
    db.commit()

    return {"status": "liked"}

# ---------------------------------------------------------
# Скачать одну фотографию
# ---------------------------------------------------------
@router.get("/{slug}/photos/{photo_id}/download")
def download_single_photo(slug: str, photo_id: int, db: Session = Depends(get_db)):
    gallery = db.query(ClientGallery).filter(ClientGallery.slug == slug).first()
    if not gallery:
        return {"error": "Gallery not found"}

    photo = (
        db.query(ClientPhoto)
        .filter(ClientPhoto.id == photo_id, ClientPhoto.gallery_id == gallery.id)
        .first()
    )

    if not photo:
        return {"error": "Photo not found"}

    # Абсолютный путь к файлу
    full_path = UPLOADS_DIR / photo.file_path

    return FileResponse(
        str(full_path),
        media_type="image/jpeg",
        filename=Path(photo.file_path).name
    )

# ---------------------------------------------------------
# Скачать всю галерею ZIP
# ---------------------------------------------------------
@router.get("/{slug}/download-all")
def download_all_photos(slug: str, db: Session = Depends(get_db)):
    gallery = db.query(ClientGallery).filter(ClientGallery.slug == slug).first()
    if not gallery:
        return {"error": "Gallery not found"}

    photos = db.query(ClientPhoto).filter(ClientPhoto.gallery_id == gallery.id).all()

    zip_buffer = io.BytesIO()

    with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zip_file:
        for photo in photos:
            full_path = UPLOADS_DIR / photo.file_path
            if full_path.exists():
                zip_file.write(full_path, arcname=Path(photo.file_path).name)

    zip_buffer.seek(0)

    return StreamingResponse(
        zip_buffer,
        media_type="application/zip",
        headers={"Content-Disposition": f"attachment; filename={slug}.zip"}
    )

# ---------------------------------------------------------
# Скачать понравившиеся ZIP
# ---------------------------------------------------------
@router.get("/{slug}/download-liked")
def download_liked_photos(slug: str, db: Session = Depends(get_db)):
    gallery = db.query(ClientGallery).filter(ClientGallery.slug == slug).first()
    if not gallery:
        return {"error": "Gallery not found"}

    liked = db.query(LikedPhoto).filter(LikedPhoto.gallery_id == gallery.id).all()
    liked_ids = [l.photo_id for l in liked]

    if not liked_ids:
        return {"error": "No liked photos"}

    photos = db.query(ClientPhoto).filter(ClientPhoto.id.in_(liked_ids)).all()

    zip_buffer = io.BytesIO()

    with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zip_file:
        for photo in photos:
            full_path = UPLOADS_DIR / photo.file_path
            if full_path.exists():
                zip_file.write(full_path, arcname=Path(photo.file_path).name)

    zip_buffer.seek(0)

    return StreamingResponse(
        zip_buffer,
        media_type="application/zip",
        headers={"Content-Disposition": f"attachment; filename={slug}_liked.zip"}
    )



# ---------------------------------------------------------
# Загрузка фотографий
# ---------------------------------------------------------

@router.post("/{slug}/photos")
def upload_photos(
    slug: str,
    files: list[UploadFile] = File(...),
    db: Session = Depends(get_db),
    authorized: bool = Depends(admin_auth)
):
    photos = add_photos_to_gallery(db, slug, files)
    return {"added": len(photos), "photos": photos}

# ---------------------------------------------------------
# Установка обложки
# ---------------------------------------------------------
@router.patch("/{slug}/cover/{photo_id}", response_model=ClientGalleryResponse)
def set_gallery_cover_route(
    slug: str,
    photo_id: int,
    db: Session = Depends(get_db),
    authorized: bool = Depends(admin_auth)
):
    return set_gallery_cover(db, slug, photo_id)


# ---------------------------------------------------------
# Удаление фото
# ---------------------------------------------------------
@router.delete("/photos/{photo_id}")
def delete_photo_route(
    photo_id: int,
    db: Session = Depends(get_db),
    authorized: bool = Depends(admin_auth)
):
    return delete_photo_from_gallery(db, photo_id)


# ---------------------------------------------------------
# Удаление галереи
# ---------------------------------------------------------
@router.delete("/{slug}")
def delete_gallery_route(
    slug: str,
    db: Session = Depends(get_db),
    authorized: bool = Depends(admin_auth)
):
    return delete_gallery(db, slug)
