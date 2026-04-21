import os
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parents[2]
DEFAULT_UPLOADS_ROOT = BASE_DIR / "uploads"

# Render disk path can be set with UPLOADS_ROOT, e.g. /var/data/uploads
UPLOADS_ROOT = Path(os.getenv("UPLOADS_ROOT", str(DEFAULT_UPLOADS_ROOT)))
GALLERIES_ROOT = UPLOADS_ROOT / "galleries"
