from sqlalchemy.orm import Session
from app.models.contact_request import ContactRequest
from app.schemas.contact_request import ContactRequestCreate


def create_contact_request(db: Session, data: ContactRequestCreate):
    new_request = ContactRequest(
        name=data.name,
        email=data.email,
        message=data.message
    )
    db.add(new_request)
    db.commit()
    db.refresh(new_request)
    return new_request