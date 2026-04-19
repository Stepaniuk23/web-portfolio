from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.config.database import Base

class ClientPhoto(Base):
    __tablename__ = "client_photos"

    id = Column(Integer, primary_key=True, index=True)
    gallery_id = Column(
        Integer,
        ForeignKey("client_galleries.id", ondelete="CASCADE"),
        nullable=False
    )

    file_path = Column(String, nullable=False)

    # ⭐ Новое поле — путь к миниатюре
    thumbnail_path = Column(String, nullable=True)

    width = Column(Integer, nullable=True)
    height = Column(Integer, nullable=True)
    likes = Column(Integer, default=0)

    gallery = relationship("ClientGallery", back_populates="photos")