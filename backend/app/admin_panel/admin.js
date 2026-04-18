console.log("Admin panel loaded");

// ---------------------------------------------------------
// Загружаем список галерей (глобальная функция для синхронизации)
// ---------------------------------------------------------
async function loadGalleries() {
  const container = document.getElementById("galleries-container");
  if (!container) return;

  container.innerHTML = "Loading...";

  try {
    const res = await fetch("/api/client-galleries/", {
      credentials: "same-origin",
    });
    const galleries = await res.json();

    container.innerHTML = "";

    galleries.forEach((g) => {
      const div = document.createElement("div");
      div.className = "gallery-card";

      const cover = g.cover_photo
        ? `/uploads/${g.cover_photo}`
        : "/admin-static/no-cover.svg";

      div.innerHTML = `
        <div class="gallery-cover">
          <img src="${cover}" alt="cover">
        </div>

        <div class="gallery-info">
          <h3 class="gallery-title">${g.title}</h3>
          <p class="gallery-date">${g.event_date}</p>
        </div>

        <button class="gallery-delete-btn" data-slug="${g.slug}">
          Delete
        </button>
      `;

      // Клик по карточке — открыть галерею
      div.addEventListener("click", () => {
        window.location.href = `/admin/gallery?slug=${g.slug}`;
      });

      // Кнопка Delete — не должна открывать галерею
      div
        .querySelector(".gallery-delete-btn")
        .addEventListener("click", (e) => {
          e.stopPropagation();
          deleteGallery(g.slug);
        });

      container.appendChild(div);
    });
  } catch (err) {
    console.error("Error loading galleries:", err);
    container.innerHTML = "Error loading galleries";
  }
}

// ---------------------------------------------------------
// Удаление галереи (глобальная функция)
// ---------------------------------------------------------
async function deleteGallery(slug) {
  if (!confirm("Delete this gallery?")) return;

  const res = await fetch(`/api/client-galleries/${slug}`, {
    method: "DELETE",
    credentials: "same-origin",
  });

  if (res.ok) {
    loadGalleries();
  } else {
    alert("Failed to delete gallery");
  }
}

// ---------------------------------------------------------
// Инициализация при загрузке DOM
// ---------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const titleInput = document.getElementById("gallery-title");
  const dateInput = document.getElementById("gallery-date");
  const createButton = document.getElementById("create-gallery-btn");
  const status = document.getElementById("create-gallery-status");

  if (!titleInput || !dateInput || !createButton || !status) {
    console.error("Admin panel form elements missing", {
      titleInput,
      dateInput,
      createButton,
      status,
    });
    return;
  }

  function updateCreateButtonState() {
    const titleFilled = titleInput.value.trim().length > 0;
    const dateFilled = dateInput.value.length > 0;
    createButton.disabled = !(titleFilled && dateFilled);
  }

  titleInput.addEventListener("input", updateCreateButtonState);
  dateInput.addEventListener("input", updateCreateButtonState);
  dateInput.addEventListener("change", updateCreateButtonState);

  updateCreateButtonState();

  // Загружаем список галерей при открытии
  loadGalleries();

  // Слушаем обновления обложки из gallery.js (через localStorage)
  window.addEventListener("storage", (e) => {
    if (e.key === "gallery_cover_updated") {
      console.log("Gallery cover updated, reloading galleries...");
      loadGalleries();
    }
  });

  // ---------------------------------------------------------
  // Создание галереи
  // ---------------------------------------------------------
  createButton.addEventListener("click", async () => {
    const title = titleInput.value.trim();
    const date = dateInput.value;

    if (!title) {
      status.textContent = "Title is required";
      status.style.color = "red";
      status.style.display = "block";
      return;
    }

    if (!date) {
      status.textContent = "Event date is required";
      status.style.color = "red";
      status.style.display = "block";
      return;
    }

    const body = {
      title: title,
      event_date: date,
    };

    try {
      const res = await fetch("/api/client-galleries/", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        status.textContent = "Gallery created!";
        status.style.color = "green";
        status.style.display = "block";

        // Автоматически скрыть сообщение
        setTimeout(() => {
          status.textContent = "";
          status.style.display = "none";
        }, 4000);

        titleInput.value = "";
        dateInput.value = "";
        updateCreateButtonState();

        loadGalleries();
      } else {
        let message = `Error ${res.status}: ${res.statusText}`;
        try {
          const err = await res.json();
          if (err?.detail) message = `Error: ${err.detail}`;
        } catch (_err) {}

        status.textContent = message;
        status.style.color = "red";
        status.style.display = "block";
      }
    } catch (error) {
      status.textContent = "Server error";
      status.style.color = "red";
      status.style.display = "block";
    }
  });
});
