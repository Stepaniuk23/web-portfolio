from fastapi import Form
from pydantic import BaseModel, EmailStr, Field


class ContactRequestCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=255)
    email: EmailStr
    message: str = Field(..., min_length=5)
    website: str | None = None  # honeypot поле

    @classmethod
    def as_form(
        cls,
        name: str = Form(...),
        email: EmailStr = Form(...),
        message: str = Form(...),
        website: str | None = Form(None),
    ):
        return cls(
            name=name,
            email=email,
            message=message,
            website=website,
        )