import sys
from pathlib import Path

# Добавляем корневую папку в path
BASE_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(BASE_DIR))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# 👉 Добавляем эти импорты
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi import Depends
from app.auth.admin import admin_auth
from sqlalchemy import inspect, text
from dotenv import load_dotenv

load_dotenv()

from app.config.database import Base, engine, SessionLocal
from app.models import contact_request, client_gallery, client_photo
from app.models.client_photo import ClientPhoto
from app.routes import contact_routes
from app.routes import client_gallery_routes
from app.services.file_storage import create_thumbnail

app = FastAPI()

# 👉 Монтируем статические файлы админки с абсолютным путём
ADMIN_PANEL_DIR = BASE_DIR / "app" / "admin_panel"
app.mount(
    "/admin-static",
    StaticFiles(directory=str(ADMIN_PANEL_DIR)),
    name="admin_static"
)

# Создаём папку uploads если её нет
UPLOADS_DIR = BASE_DIR / "uploads"
UPLOADS_DIR.mkdir(parents=True, exist_ok=True)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Создаём таблицы
Base.metadata.create_all(bind=engine)

# Если база уже существует, но столбец thumbnail_path отсутствует, добавим его и обновим существующие записи
def apply_database_updates() -> None:
    inspector = inspect(engine)
    if "client_photos" in inspector.get_table_names():
        columns = [column_info["name"] for column_info in inspector.get_columns("client_photos")]
        if "thumbnail_path" not in columns:
            with engine.connect() as connection:
                connection.execute(text('ALTER TABLE client_photos ADD COLUMN thumbnail_path VARCHAR'))
                connection.commit()
            print("Database updated: added thumbnail_path column to client_photos")

    db = SessionLocal()
    try:
        missing_thumbs = db.query(ClientPhoto).filter(ClientPhoto.thumbnail_path == None).all()
        for photo in missing_thumbs:
            if photo.file_path:
                try:
                    photo.thumbnail_path = create_thumbnail(photo.file_path)
                except Exception as exc:
                    print(f"Warning: failed to create thumbnail for {photo.file_path}: {exc}")
                    # Если не удалось создать, используем оригинал
                    photo.thumbnail_path = photo.file_path
        db.commit()
    finally:
        db.close()

apply_database_updates()

# 👉 Защищённый вход в админку
@app.get("/admin")
def admin_entry(authorized: bool = Depends(admin_auth)):
    return FileResponse("app/admin_panel/index.html")

# 👉 Монтируем папку uploads (для фотографий)
app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)

@app.get("/admin/gallery")
def admin_gallery_page(authorized: bool = Depends(admin_auth)):
    return FileResponse("app/admin_panel/gallery.html")

# Подключаем маршруты
app.include_router(contact_routes.router)
app.include_router(client_gallery_routes.router)

@app.get("/")
def read_root():
    return {"message": "Hello World"}

def home():
    return {"message": "Backend is working"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)