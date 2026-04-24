import "./Gallery.css";
import { useState } from "react";

import img1 from "../../assets/gallery/gallery1.jpg";
import img2 from "../../assets/gallery/gallery2.jpg";
import img3 from "../../assets/gallery/gallery3.jpg";
import img4 from "../../assets/gallery/gallery4.jpg";
import img5 from "../../assets/gallery/gallery5.jpg";
import img6 from "../../assets/gallery/gallery6.jpg";
import img7 from "../../assets/gallery/gallery7.jpg";
import img8 from "../../assets/gallery/gallery8.jpg";
import img9 from "../../assets/gallery/gallery9.jpg";
import img10 from "../../assets/gallery/gallery10.jpg";
import img11 from "../../assets/gallery/gallery11.jpg";
import img12 from "../../assets/gallery/gallery12.jpg";
import img13 from "../../assets/gallery/gallery13.jpg";
import img14 from "../../assets/gallery/gallery14.jpg";
import img15 from "../../assets/gallery/gallery15.jpg";
import img16 from "../../assets/gallery/gallery16.jpg";
import img17 from "../../assets/gallery/gallery17.jpg";
import img18 from "../../assets/gallery/gallery18.jpg";
import img19 from "../../assets/gallery/gallery19.jpg";
import img20 from "../../assets/gallery/gallery20.jpg";
import img21 from "../../assets/gallery/gallery21.jpg";
import img22 from "../../assets/gallery/gallery22.jpg";

function Gallery() {
  const images = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
    img13,
    img14,
    img15,
    img16,
    img17,
    img18,
    img19,
    img20,
    img21,
    img22,
  ];

  const [selectedIndex, setSelectedIndex] = useState(null);

  const openLightbox = (index) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const nextPhoto = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const prevPhoto = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="gallery-container">
      <h2 className="gallery-title">My Recent Work</h2>

      <div className="masonry">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt=""
            onClick={() => openLightbox(index)}
            className="gallery-img"
          />
        ))}
      </div>

      {/* Лайтбокс */}
      <div
        className={`lightbox${selectedIndex !== null ? " active" : ""}`}
        onClick={closeLightbox}
      >
        <img
          src={images[selectedIndex]}
          alt=""
          className="lightbox-img"
          onClick={(e) => e.stopPropagation()}
        />

        {/* Кнопка закрытия */}
        <button className="lightbox-close" onClick={closeLightbox}>
          ✕
        </button>

        {/* Стрелка влево */}
        <button
          className="lightbox-arrow left"
          onClick={(e) => {
            e.stopPropagation();
            prevPhoto();
          }}
        >
          ‹
        </button>

        {/* Стрелка вправо */}
        <button
          className="lightbox-arrow right"
          onClick={(e) => {
            e.stopPropagation();
            nextPhoto();
          }}
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default Gallery;
