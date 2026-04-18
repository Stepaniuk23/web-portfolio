from sqlalchemy import Column, Integer, ForeignKey, DateTime, func
from app.config.database import Base

class LikedPhoto(Base):
    __tablename__ = "liked_photos"

    id = Column(Integer, primary_key=True, index=True)
    gallery_id = Column(Integer, ForeignKey("client_galleries.id", ondelete="CASCADE"))
    photo_id = Column(Integer, ForeignKey("client_photos.id", ondelete="CASCADE"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
