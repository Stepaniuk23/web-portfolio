import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";

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

  const photos = gallery?.photos || [];

  // Фильтрация
  const filteredPhotos = showOnlyLiked
    ? photos.filter((p) => likedPhotos.includes(p.id))
    : photos;

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevPhoto = useCallback(() => {
    setLightboxIndex(
      (current) =>
        (current - 1 + filteredPhotos.length) % filteredPhotos.length,
    );
  }, [filteredPhotos.length]);

  const nextPhoto = useCallback(() => {
    setLightboxIndex((current) => (current + 1) % filteredPhotos.length);
  }, [filteredPhotos.length]);

  useEffect(() => {
    if (lightboxIndex === null) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, prevPhoto, nextPhoto]);

  if (!gallery) {
    return (
      <div className="gallery-loading">
        <span>Loading</span>
      </div>
    );
  }

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

  return (
    <>
      <Helmet>
        <title>{gallery.title} | Denys Stepaniuk</title>
        <meta
          name="description"
          content={`Private client gallery for ${gallery.title}.`}
        />
      </Helmet>

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
          aria-label={showOnlyLiked ? "Show all photos" : "Show liked photos"}
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
          aria-label="Download all photos"
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
          aria-label="Download liked photos"
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
                  alt={`${gallery.title} ${index + 1}`}
                  loading="lazy"
                />

                {/* Сердечко */}
                <button
                  className={`like-btn${isLiked ? " is-liked" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(photo.id);
                  }}
                  aria-label={isLiked ? "Unlike photo" : "Like photo"}
                  title={isLiked ? "Unlike photo" : "Like photo"}
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
                  aria-label="Download photo"
                  title="Download photo"
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
          <button
            className="lightbox-close"
            onClick={closeLightbox}
            aria-label="Close"
            title="Close"
          >
            &times;
          </button>

          <button
            className="lightbox-arrow left"
            onClick={prevPhoto}
            aria-label="Previous photo"
            title="Previous photo"
          >
            &#10094;
          </button>

          <img
            className="lightbox-img"
            src={uploadUrl(filteredPhotos[lightboxIndex].file_path)}
            alt={`${gallery.title} ${lightboxIndex + 1}`}
          />

          <button
            className="lightbox-arrow right"
            onClick={nextPhoto}
            aria-label="Next photo"
            title="Next photo"
          >
            &#10095;
          </button>
        </div>
      )}
    </>
  );
}

export default ClientGallery;
