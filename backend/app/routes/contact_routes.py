import time

rate_limit_cache = {}

from fastapi import APIRouter, Depends, status, Request
from sqlalchemy.orm import Session
from fastapi.responses import HTMLResponse  # ← добавили
import time

from app.config.database import get_db
from app.schemas.contact_request import ContactRequestCreate
from app.controllers.contact_controller import create_contact_request
from app.services.email_service import send_contact_email

router = APIRouter(
    prefix="/api/contact",
    tags=["contact"]
)

rate_limit_cache = {}  # IP → timestamp


@router.post("/", status_code=status.HTTP_201_CREATED)
def submit_contact_form(
    request: Request,
    data: ContactRequestCreate = Depends(ContactRequestCreate.as_form),
    db: Session = Depends(get_db)
):
    # 🛡️ HONEYPOT
    if data.website:
        return {"status": "ok"}

    # 🛡️ RATE LIMIT — ограничение частоты
    client_ip = request.client.host
    now = time.time()

    LIMIT_SECONDS = 10

    last_time = rate_limit_cache.get(client_ip)

    if last_time and (now - last_time) < LIMIT_SECONDS:
        return {"status": "ok"}

    rate_limit_cache[client_ip] = now

    # 1. Сохраняем в базу
    create_contact_request(db, data)

    # 2. Отправляем письмо с обработкой ошибок
    try:
        send_contact_email(
            name=data.name,
            email=data.email,
            message=data.message
        )
    except Exception as e:
        print(f"❌ Email error: {str(e)}")
        # Письмо не отправилось, но ответ всё равно успешный (данные сохранены)
        return {"status": "success", "note": "Message saved but email sending failed"}

    # ⭐ Возвращаем JSON ответ
    return {"status": "success"}