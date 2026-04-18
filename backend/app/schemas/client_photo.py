from pydantic import BaseModel


class ClientPhotoBase(BaseModel):
    file_path: str
    thumbnail_path: str | None = None   # ← добавили миниатюру
    width: int | None = None
    height: int | None = None
    likes: int = 0


class ClientPhotoCreate(ClientPhotoBase):
    pass


class ClientPhotoResponse(ClientPhotoBase):
    id: int
    gallery_id: int

    class Config:
        from_attributes = True