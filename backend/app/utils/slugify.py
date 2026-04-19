import re
import unicodedata


def slugify(value: str) -> str:
    # Приводим к нормальной форме (убираем диакритику)
    value = unicodedata.normalize("NFKD", value)
    value = value.encode("ascii", "ignore").decode("ascii")

    # В нижний регистр
    value = value.lower()

    # Заменяем всё, что не буква/цифра, на дефис
    value = re.sub(r"[^a-z0-9]+", "-", value)

    # Убираем лишние дефисы по краям
    value = value.strip("-")

    # На случай пустой строки
    return value or "gallery"