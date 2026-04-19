from datetime import datetime
from sqlalchemy import Column, Integer, String, Date, DateTime
from sqlalchemy.orm import relationship
from app.config.database import Base

class ClientGallery(Base):
    __tablename__ = "client_galleries"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    event_date = Column(Date, nullable=True)
    cover_photo = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    photos = relationship(
        "ClientPhoto",
        back_populates="gallery",
        cascade="all, delete-orphan"
    )