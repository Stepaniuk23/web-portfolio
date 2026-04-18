import os
from pathlib import Path
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.orm import Session
from dotenv import load_dotenv

load_dotenv()

# Абсолютный путь к базе данных
BASE_DIR = Path(__file__).resolve().parent.parent.parent
db_path = BASE_DIR / "app.db"
DATABASE_URL = os.getenv("DATABASE_URL", f"sqlite:///{db_path}")

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True
)


SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()