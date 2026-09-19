from fastapi import Form
from pydantic import BaseModel, EmailStr, Field, field_validator


class ContactRequestCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr = Field(..., max_length=254)
    message: str = Field(..., min_length=5, max_length=5000)
    website: str | None = Field(default=None, max_length=200)

    @field_validator("name", "email", "message", mode="before")
    @classmethod
    def strip_text(cls, value):
        return value.strip() if isinstance(value, str) else value

    @classmethod
    def as_form(
        cls,
        name: str = Form(..., min_length=2, max_length=120),
        email: EmailStr = Form(..., max_length=254),
        message: str = Form(..., min_length=5, max_length=5000),
        website: str | None = Form(None, max_length=200),
    ):
        return cls(
            name=name,
            email=email,
            message=message,
            website=website,
        )