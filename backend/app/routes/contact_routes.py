import time

from fastapi import APIRouter, Depends, status, Request, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.schemas.contact_request import ContactRequestCreate
from app.controllers.contact_controller import create_contact_request
from app.services.email_service import send_contact_email

router = APIRouter(
    prefix="/api/contact",
    tags=["contact"]
)

rate_limit_cache = {}  # IP -> timestamp


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

    rate_limit_cache.pop(client_ip, None)
    if len(rate_limit_cache) > 10000:
        oldest_ip = min(rate_limit_cache, key=rate_limit_cache.get)
        rate_limit_cache.pop(oldest_ip, None)
    rate_limit_cache[client_ip] = now

    # 1. Сохраняем в базу
    create_contact_request(db, data)

    # 2. Отправляем письмо. Если SMTP сломан, не маскируем это как успех.
    try:
        send_contact_email(
            name=data.name,
            email=data.email,
            message=data.message
        )
    except Exception as e:
        print(f"❌ Email error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Your message was saved, but it could not be delivered. Please try again later."
        )

    # ⭐ Возвращаем JSON ответ
    return {"status": "success"}