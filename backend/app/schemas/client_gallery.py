from datetime import date, datetime
from pydantic import BaseModel
from typing import List, Optional
from app.schemas.client_photo import ClientPhotoResponse


class ClientGalleryBase(BaseModel):
    title: str
    event_date: Optional[date] = None


class ClientGalleryCreate(BaseModel):
    title: str
    event_date: date


class ClientGalleryResponse(ClientGalleryBase):
    id: int
    slug: str
    cover_photo: Optional[str] = None
    created_at: datetime
    photos: List[ClientPhotoResponse] = []
    liked_photos: List[int] = []

    class Config:
        from_attributes = True