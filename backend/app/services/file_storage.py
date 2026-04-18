import os
from pathlib import Path
from typing import List
from fastapi import UploadFile
from PIL import Image, ImageOps

# Корень backend (там, где лежит main.py)
BASE_DIR = Path(__file__).resolve().parents[2]

# Папка для галерей: backend/uploads/galleries
GALLERIES_ROOT = BASE_DIR / "uploads" / "galleries"
GALLERIES_ROOT.mkdir(parents=True, exist_ok=True)


def save_gallery_photos(slug: str, files: List[UploadFile]) -> List[str]:
    """
    Сохраняет файлы в папку backend/uploads/galleries/<slug>/
    Возвращает список относительных путей (относительно папки uploads).
    """
    gallery_dir = GALLERIES_ROOT / slug
    gallery_dir.mkdir(parents=True, exist_ok=True)

    saved_paths: List[str] = []

    for file in files:
        filename = os.path.basename(file.filename)
        if not filename:
            continue

        target_path = gallery_dir / filename

        with open(target_path, "wb") as out_file:
            content = file.file.read()
            out_file.write(content)

        # Относительный путь, который можно хранить в БД
        relative_path = f"galleries/{slug}/{filename}"
        saved_paths.append(relative_path)

    return saved_paths


def create_thumbnail(original_relative_path: str, size: int = 1600) -> str:
    try:
        abs_original = BASE_DIR / "uploads" / original_relative_path

        if not abs_original.exists():
            raise FileNotFoundError(f"Original file not found: {abs_original}")

        with Image.open(abs_original) as img:
            # Исправляем ориентацию по EXIF (очень важно для фото с камер)
            try:
                img = ImageOps.exif_transpose(img)
            except Exception:
                pass

            # Конвертация в RGB (на случай PNG или прозрачности)
            if img.mode in ('RGBA', 'LA', 'P'):
                rgb_img = Image.new('RGB', img.size, (255, 255, 255))
                rgb_img.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                img = rgb_img

            # 👉 Генерируем миниатюру 1600 px по длинной стороне
            img.thumbnail((size, size), Image.Resampling.LANCZOS)

            # Путь миниатюры
            base, _ = os.path.splitext(original_relative_path)
            thumbnail_relative = f"{base}_thumb.jpg"
            abs_thumbnail = BASE_DIR / "uploads" / thumbnail_relative

            abs_thumbnail.parent.mkdir(parents=True, exist_ok=True)

            # 👉 JPEG 80% качества — идеальный баланс
            img.save(abs_thumbnail, format='JPEG', quality=80, optimize=True)

        return thumbnail_relative

    except Exception as e:
        raise RuntimeError(f"Failed to create thumbnail for {original_relative_path}: {str(e)}")

def delete_file(relative_path: str | None) -> None:
    if not relative_path:
        return

    abs_path = BASE_DIR / "uploads" / relative_path
    try:
        if abs_path.exists():
            abs_path.unlink()
    except Exception as e:
        print(f"Warning: failed to delete file {abs_path}: {e}")


def delete_gallery_photo_files(original_relative_path: str, thumbnail_relative_path: str | None = None) -> None:
    delete_file(original_relative_path)
    delete_file(thumbnail_relative_path)