from sqlalchemy.orm import Session
from fastapi import HTTPException, UploadFile
from typing import List

from app.models.client_gallery import ClientGallery
from app.models.client_photo import ClientPhoto
from app.schemas.client_gallery import ClientGalleryCreate, ClientGalleryResponse
from app.schemas.client_photo import ClientPhotoResponse
from app.utils.slugify import slugify
from app.services.file_storage import (
    save_gallery_photos,
    create_thumbnail,
    delete_gallery_photo_files
)
from app.models.liked_photo import LikedPhoto



# ---------------------------------------------------------
# Создание галереи
# ---------------------------------------------------------
def create_gallery(db: Session, data: ClientGalleryCreate) -> ClientGallery:
    slug = slugify(data.title)

    existing = db.query(ClientGallery).filter(ClientGallery.slug == slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Gallery with this title already exists")

    gallery = ClientGallery(
        title=data.title,
        slug=slug,
        event_date=data.event_date
    )

    db.add(gallery)
    db.commit()
    db.refresh(gallery)

    return gallery


# ---------------------------------------------------------
# Получение галереи по slug
# ---------------------------------------------------------
from app.models.liked_photo import LikedPhoto

def get_gallery_by_slug(db: Session, slug: str):
    gallery = db.query(ClientGallery).filter(ClientGallery.slug == slug).first()
    if not gallery:
        raise HTTPException(status_code=404, detail="Gallery not found")

    # Сортировка фото по имени файла
    gallery.photos.sort(key=lambda p: p.file_path.split("/")[-1].lower())

    # Получаем список лайкнутых фото
    liked = (
        db.query(LikedPhoto.photo_id)
        .filter(LikedPhoto.gallery_id == gallery.id)
        .all()
    )
    liked_photo_ids = [row[0] for row in liked]

    # Формируем ответ
    photos = [ClientPhotoResponse.from_orm(photo) for photo in gallery.photos]
    
    return ClientGalleryResponse(
        id=gallery.id,
        slug=gallery.slug,
        title=gallery.title,
        event_date=gallery.event_date,
        cover_photo=gallery.cover_photo,
        created_at=gallery.created_at,
        photos=photos,
        liked_photos=liked_photo_ids
    )



# ---------------------------------------------------------
# Добавление фото в галерею (с миниатюрами)
# ---------------------------------------------------------
def add_photos_to_gallery(db: Session, slug: str, files: List[UploadFile]) -> List[ClientPhotoResponse]:
    gallery = db.query(ClientGallery).filter(ClientGallery.slug == slug).first()
    if not gallery:
        raise HTTPException(status_code=404, detail="Gallery not found")

    saved_paths = save_gallery_photos(slug, files)

    photo_objects = []
    failed_photos = []

    for path in saved_paths:
        try:
            thumbnail_path = create_thumbnail(path)

            photo = ClientPhoto(
                gallery_id=gallery.id,
                file_path=path
            )
            photo.thumbnail_path = thumbnail_path

            db.add(photo)
            photo_objects.append(photo)

        except Exception as e:
            # Если thumbnail не создался, используем оригинал как thumbnail
            print(f"Warning: Failed to create thumbnail for {path}: {str(e)}")
            photo = ClientPhoto(
                gallery_id=gallery.id,
                file_path=path
            )
            photo.thumbnail_path = path  # Используем оригинал
            db.add(photo)
            photo_objects.append(photo)

    db.commit()

    for photo in photo_objects:
        db.refresh(photo)

    result = [ClientPhotoResponse.from_orm(photo) for photo in photo_objects]

    if failed_photos:
        print(f"Failed to process {len(failed_photos)} photos: {failed_photos}")

    return result


# ---------------------------------------------------------
# Установка обложки галереи
# ---------------------------------------------------------
def set_gallery_cover(db: Session, slug: str, photo_id: int) -> ClientGalleryResponse:
    gallery = db.query(ClientGallery).filter(ClientGallery.slug == slug).first()
    if not gallery:
        raise HTTPException(status_code=404, detail="Gallery not found")

    photo = db.query(ClientPhoto).filter(
        ClientPhoto.id == photo_id,
        ClientPhoto.gallery_id == gallery.id
    ).first()

    if not photo:
        raise HTTPException(status_code=404, detail="Photo not found in this gallery")

    gallery.cover_photo = photo.file_path
    db.commit()
    db.refresh(gallery)

    return ClientGalleryResponse.from_orm(gallery)


# ---------------------------------------------------------
# Удаление фото
# ---------------------------------------------------------
def delete_photo_from_gallery(db: Session, photo_id: int):
    photo = db.query(ClientPhoto).filter(ClientPhoto.id == photo_id).first()
    if not photo:
        raise HTTPException(status_code=404, detail="Photo not found")

    delete_gallery_photo_files(photo.file_path, photo.thumbnail_path)

    db.delete(photo)
    db.commit()

    return {"deleted": True}


# ---------------------------------------------------------
# Удаление галереи полностью
# ---------------------------------------------------------
def delete_gallery(db: Session, slug: str):
    gallery = db.query(ClientGallery).filter(ClientGallery.slug == slug).first()
    if not gallery:
        raise HTTPException(status_code=404, detail="Gallery not found")

    # Удаляем все фото галереи
    for photo in gallery.photos:
        delete_gallery_photo_files(photo.file_path, photo.thumbnail_path)
        db.delete(photo)

    # Удаляем саму галерею
    db.delete(gallery)
    db.commit()

    return {"deleted": True}