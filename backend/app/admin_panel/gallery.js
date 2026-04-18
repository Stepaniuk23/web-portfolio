console.log("Gallery page loaded");

// Получаем slug из URL
const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

if (!slug) {
  alert("No gallery slug provided");
}

// Загружаем данные галереи
async function loadGallery() {
  const res = await fetch(`/api/client-galleries/${slug}`, {
    credentials: "same-origin",
  });
  const data = await res.json();

  document.getElementById("gallery-title").textContent = data.title;
  document.getElementById("gallery-date").textContent = data.event_date;

  // --- Share button ---
  const shareBtn = document.getElementById("share-gallery-btn");
  if (shareBtn) {
    shareBtn.onclick = () => {
      const FRONTEND_URL = "http://localhost:3000";
      const url = `${FRONTEND_URL}/gallery/${data.slug}`;
      navigator.clipboard.writeText(url);
      alert("Ссылка скопирована:\n" + url);
    };
  }

  const deleteButton = document.getElementById("delete-gallery-btn");
  if (deleteButton) {
    deleteButton.onclick = () => deleteGallery(data.slug);
  }

  const container = document.getElementById("photos-container");
  container.innerHTML = "";

  data.photos.forEach((photo) => {
    const div = document.createElement("div");
    div.className = "photo-item";

    // Используем thumbnail, если есть, иначе оригинал
    const imageSrc = photo.thumbnail_path
      ? `/uploads/${photo.thumbnail_path}`
      : `/uploads/${photo.file_path}`;

    div.innerHTML = `
      <div class="photo-actions">
        <button class="set-cover" data-id="${photo.id}">Set Cover</button>
        <button class="delete-photo" data-id="${photo.id}">Delete</button>
      </div>

      <img src="${imageSrc}" class="thumb" alt="${photo.file_path.split("/").pop()}">

      <div class="photo-filename">${photo.file_path.split("/").pop()}</div>
    `;

    // Set cover
    div.querySelector(".set-cover").onclick = () => setCover(photo.id);

    // Delete
    div.querySelector(".delete-photo").onclick = () =>
      deletePhoto(photo.id, div);

    container.appendChild(div);
  });
}

loadGallery();

// --- Upload logic ---

const dropzone = document.getElementById("dropzone");
const fileInput = document.getElementById("file-input");
const uploadStatus = document.getElementById("upload-status");

// Подсветка при перетаскивании
dropzone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropzone.classList.add("dragover");
});

dropzone.addEventListener("dragleave", () => {
  dropzone.classList.remove("dragover");
});

// Обработка drop
dropzone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropzone.classList.remove("dragover");

  const files = e.dataTransfer.files;
  uploadFiles(files);
});

// Обработка выбора файлов через input
fileInput.addEventListener("change", () => {
  uploadFiles(fileInput.files);
});

// Функция загрузки файлов
async function uploadFiles(files) {
  if (!files.length) return;

  uploadStatus.textContent = "Uploading...";
  uploadStatus.style.color = "black";

  const formData = new FormData();
  for (let file of files) {
    formData.append("files", file);
  }

  try {
    const res = await fetch(`/api/client-galleries/${slug}/photos`, {
      method: "POST",
      credentials: "same-origin",
      body: formData,
    });

    if (res.ok) {
      uploadStatus.textContent = "Upload complete!";
      uploadStatus.style.color = "green";

      setTimeout(() => {
        uploadStatus.textContent = "";
      }, 4000);

      loadGallery(); // обновляем список фото
    } else {
      uploadStatus.textContent = "Upload failed";
      uploadStatus.style.color = "red";
    }
  } catch (err) {
    uploadStatus.textContent = "Server error";
    uploadStatus.style.color = "red";
  }
}

// Удаление фото
async function deletePhoto(id, element) {
  const res = await fetch(`/api/client-galleries/photos/${id}`, {
    method: "DELETE",
    credentials: "same-origin",
  });

  if (res.ok) {
    element.remove();
  } else {
    alert("Failed to delete photo");
    console.error("Delete photo failed", await res.text());
  }
}

// Установка обложки
async function setCover(id) {
  const res = await fetch(`/api/client-galleries/${slug}/cover/${id}`, {
    method: "PATCH",
    credentials: "same-origin",
  });

  if (res.ok) {
    alert("Cover updated");
    // Уведомляем админ панель об обновлении через localStorage
    localStorage.setItem(
      "gallery_cover_updated",
      JSON.stringify({
        slug: slug,
        timestamp: Date.now(),
      }),
    );
    // Перезагружаем галерею чтобы показать новую обложку
    loadGallery();
  } else {
    alert("Failed to update cover");
  }
}

async function deleteGallery(slug) {
  if (!confirm("Delete this gallery?")) return;

  const res = await fetch(`/api/client-galleries/${slug}`, {
    method: "DELETE",
    credentials: "same-origin",
  });

  if (res.ok) {
    window.location.href = "/admin";
  } else {
    alert("Failed to delete gallery");
    console.error("Delete gallery failed", await res.text());
  }
}
