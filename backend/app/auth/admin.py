import os
import secrets
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from dotenv import load_dotenv

load_dotenv()

security = HTTPBasic()

# Загружаем один раз при старте приложения
ADMIN_USERNAME = os.getenv("ADMIN_USERNAME")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")


def admin_auth(credentials: HTTPBasicCredentials = Depends(security)):
    username_ok = secrets.compare_digest(credentials.username, ADMIN_USERNAME)
    password_ok = secrets.compare_digest(credentials.password, ADMIN_PASSWORD)

    if not (username_ok and password_ok):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized",
            headers={"WWW-Authenticate": "Basic"},
        )

    return {"username": ADMIN_USERNAME}
