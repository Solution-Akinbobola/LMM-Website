import { useState } from "react";
import { galleryData } from "../data/galleryData";

function MediaGallery({ language = "en" }) {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedIndex, setSelectedIndex] = useState(null);

  const labels = {
    en: {
      section: "11 / MEDIA",
      title: "LMM",
      titleStrong: "GALLERY.",
      description:
        "Matches, players, moments and memories from the Legends of MiniMilitia.",
      all: "ALL",
      matches: "MATCHES",
      players: "PLAYERS",
      community: "COMMUNITY",
      legacy: "LEGACY",
      close: "CLOSE",
      previous: "Previous image",
      next: "Next image"
    },
    es: {
      section: "11 / MEDIOS",
      title: "GALERÍA",
      titleStrong: "LMM.",
      description:
        "Partidas, jugadores, momentos y recuerdos de Legends of MiniMilitia.",
      all: "TODOS",
      matches: "PARTIDAS",
      players: "JUGADORES",
      community: "COMUNIDAD",
      legacy: "LEGADO",
      close: "CERRAR",
      previous: "Imagen anterior",
      next: "Siguiente imagen"
    }
  }[language];

  const categories = [
    {
      value: "ALL",
      label: labels.all
    },
    {
      value: "MATCHES",
      label: labels.matches
    },
    {
      value: "PLAYERS",
      label: labels.players
    },
    {
      value: "COMMUNITY",
      label: labels.community
    },
    {
      value: "LEGACY",
      label: labels.legacy
    }
  ];

  const filteredGallery =
    activeCategory === "ALL"
      ? galleryData
      : galleryData.filter(
          (item) => item.category === activeCategory
        );

  const selectedImage =
    selectedIndex !== null
      ? filteredGallery[selectedIndex]
      : null;

  const openImage = (index) => {
    setSelectedIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeImage = () => {
    setSelectedIndex(null);
    document.body.style.overflow = "";
  };

  const previousImage = () => {
    setSelectedIndex((current) =>
      current === 0
        ? filteredGallery.length - 1
        : current - 1
    );
  };

  const nextImage = () => {
    setSelectedIndex((current) =>
      current === filteredGallery.length - 1
        ? 0
        : current + 1
    );
  };

  return (
    <>
      <section className="media-gallery" id="gallery">
        <div className="media-gallery-header">
          <div>
            <span>{labels.section}</span>

            <h2>
              {labels.title}
              <br />
              <strong>{labels.titleStrong}</strong>
            </h2>
          </div>

          <p>{labels.description}</p>
        </div>

        <div className="gallery-filters">
          {categories.map((category) => (
            <button
              type="button"
              key={category.value}
              className={
                activeCategory === category.value
                  ? "active"
                  : ""
              }
              onClick={() => {
                setActiveCategory(category.value);
                setSelectedIndex(null);
              }}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {filteredGallery.map((item, index) => {
            const itemText =
              item[language] || item.en;

            return (
              <button
                type="button"
                className="gallery-card"
                key={item.id}
                onClick={() => openImage(index)}
              >
                <div className="gallery-image">
                  <img
                    src={item.image}
                    alt={itemText.title}
                    onError={(event) => {
                      event.currentTarget.style.display =
                        "none";
                    }}
                  />

                  <span className="gallery-category">
                    {item.category}
                  </span>

                  <span className="gallery-expand">
                    ↗
                  </span>
                </div>

                <div className="gallery-card-info">
                  <strong>{itemText.title}</strong>
                  <span>{item.date}</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {selectedImage && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage[language]?.title}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeImage();
            }
          }}
        >
          <button
            type="button"
            className="gallery-close"
            onClick={closeImage}
            aria-label={labels.close}
          >
            ×
          </button>

          <button
            type="button"
            className="gallery-prev"
            onClick={previousImage}
            aria-label={labels.previous}
          >
            ←
          </button>

          <div className="gallery-lightbox-content">
            <img
              src={selectedImage.image}
              alt={
                selectedImage[language]?.title ||
                selectedImage.en.title
              }
            />

            <div className="gallery-lightbox-info">
              <span>{selectedImage.category}</span>

              <h3>
                {selectedImage[language]?.title ||
                  selectedImage.en.title}
              </h3>

              <p>
                {selectedImage[language]?.description ||
                  selectedImage.en.description}
              </p>

              <small>{selectedImage.date}</small>
            </div>
          </div>

          <button
            type="button"
            className="gallery-next"
            onClick={nextImage}
            aria-label={labels.next}
          >
            →
          </button>
        </div>
      )}
    </>
  );
}

export default MediaGallery;