import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ClientGalleryHero from "../../components/ClientGalleryHero";

import "./ClientGallery.css";

import HeartOutline from "../../components/icons/HeartOutline";
import HeartFilled from "../../components/icons/HeartFilled";
import DownloadIcon from "../../components/icons/DownloadIcon";
import { apiUrl, uploadUrl } from "../../config";

function ClientGallery() {
  const { slug } = useParams();
  const [gallery, setGallery] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const [likedPhotos, setLikedPhotos] = useState([]);
  const [showOnlyLiked, setShowOnlyLiked] = useState(false);

  useEffect(() => {
    fetch(apiUrl(`/api/client-galleries/${slug}`))
      .then((res) => res.json())
      .then((data) => {
        setGallery(data);
        setLikedPhotos(data.liked_photos || []);
      });
  }, [slug]);

  if (!gallery) return <div>Loading...</div>;

  const photos = gallery.photos;

  // Фильтрация
  const filteredPhotos = showOnlyLiked
    ? photos.filter((p) => likedPhotos.includes(p.id))
    : photos;

  // Toggle Like
  async function toggleLike(photoId) {
    const res = await fetch(
      apiUrl(`/api/client-galleries/${slug}/toggle-like/${photoId}`),
      { method: "POST" },
    );

    const data = await res.json();

    if (data.status === "liked") {
      setLikedPhotos((prev) => [...prev, photoId]);
    } else {
      setLikedPhotos((prev) => prev.filter((id) => id !== photoId));
    }
  }

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevPhoto = () => {
    setLightboxIndex(
      (lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length,
    );
  };

  const nextPhoto = () => {
    setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
  };

  return (
    <>
      <Header />

      <ClientGalleryHero
        title={gallery.title}
        eventDate={gallery.event_date}
        coverPhoto={uploadUrl(gallery.cover_photo)}
      />

      {/* Кнопки управления */}
      <div className="controls-container">
        <button
          className="filter-btn"
          onClick={() => setShowOnlyLiked((prev) => !prev)}
          title={showOnlyLiked ? "Show all photos" : "Show liked photos"}
        >
          {showOnlyLiked ? (
            <HeartFilled size={20} />
          ) : (
            <HeartOutline size={20} />
          )}
        </button>

        <button
          className="download-btn"
          onClick={() =>
            (window.location.href = apiUrl(
              `/api/client-galleries/${slug}/download-all`,
            ))
          }
          title="Download all photos"
        >
          <span>All</span>
          <DownloadIcon size={18} />
        </button>

        <button
          className="download-btn"
          onClick={() =>
            (window.location.href = apiUrl(
              `/api/client-galleries/${slug}/download-liked`,
            ))
          }
          title="Download liked photos"
        >
          <HeartFilled size={16} />
          <DownloadIcon size={16} />
        </button>
      </div>

      <div className="gallery-container">
        <div className="masonry">
          {filteredPhotos.map((photo, index) => {
            const isLiked = likedPhotos.includes(photo.id);

            return (
              <div key={photo.id} className="photo-wrapper">
                <img
                  src={uploadUrl(photo.thumbnail_path)}
                  className="gallery-img"
                  onClick={() => openLightbox(index)}
                  alt=""
                />

                {/* Сердечко */}
                <button
                  className="like-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(photo.id);
                  }}
                >
                  {isLiked ? <HeartFilled /> : <HeartOutline />}
                </button>

                {/* Скачать фото */}
                <a
                  className="download-photo-btn"
                  href={apiUrl(
                    `/api/client-galleries/${slug}/photos/${photo.id}/download`,
                  )}
                  onClick={(e) => e.stopPropagation()}
                  download
                >
                  <DownloadIcon />
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {lightboxIndex !== null && (
        <div className="lightbox active">
          <button className="lightbox-close" onClick={closeLightbox}>
            &times;
          </button>

          <button className="lightbox-arrow left" onClick={prevPhoto}>
            &#10094;
          </button>

          <img
            className="lightbox-img"
            src={uploadUrl(filteredPhotos[lightboxIndex].file_path)}
            alt=""
          />

          <button className="lightbox-arrow right" onClick={nextPhoto}>
            &#10095;
          </button>
        </div>
      )}

      <Footer />
    </>
  );
}

export default ClientGallery;
