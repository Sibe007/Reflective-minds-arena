"use client";

import { useState } from "react";
import { urlFor } from "../sanity/image";

export default function ProjectGallery({ projects }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  if (!projects || projects.length === 0) {
    return (
      <p className="arch-empty">
        Project photos will appear here once added in Studio — Architecture — Add a New Project.
      </p>
    );
  }

  const active = activeIndex !== null ? projects[activeIndex] : null;
  const activePhotos = active ? [active.coverImage, ...(active.moreImages || [])].filter(Boolean) : [];

  function openProject(i) {
    setActiveIndex(i);
    setPhotoIndex(0);
  }

  function close() {
    setActiveIndex(null);
    setPhotoIndex(0);
  }

  function nextPhoto(e) {
    e.stopPropagation();
    setPhotoIndex((p) => (p + 1) % activePhotos.length);
  }

  function prevPhoto(e) {
    e.stopPropagation();
    setPhotoIndex((p) => (p - 1 + activePhotos.length) % activePhotos.length);
  }

  return (
    <>
      <div className="arch-gallery-grid">
        {projects.map((item, i) => (
          <figure
            className="arch-gallery-item"
            key={item._id}
            onClick={() => openProject(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" ? openProject(i) : null)}
          >
            {item.coverImage && (
              <img src={urlFor(item.coverImage).width(700).url()} alt={item.title || "Project photo"} />
            )}
            {(item.title || item.category) && (
              <figcaption>
                {item.category && <span className="arch-tag">{item.category}</span>}
                {item.title && <span>{item.title}</span>}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {active && (
        <div className="arch-lightbox" onClick={close}>
          <button className="arch-lightbox-close" onClick={close} aria-label="Close">
            ✕
          </button>
          <div className="arch-lightbox-inner" onClick={(e) => e.stopPropagation()}>
            {activePhotos.length > 1 && (
              <button className="arch-lightbox-nav arch-lightbox-prev" onClick={prevPhoto} aria-label="Previous photo">
                ‹
              </button>
            )}
            <img
              src={urlFor(activePhotos[photoIndex]).width(1400).url()}
              alt={active.title || "Project photo"}
              className="arch-lightbox-img"
            />
            {activePhotos.length > 1 && (
              <button className="arch-lightbox-nav arch-lightbox-next" onClick={nextPhoto} aria-label="Next photo">
                ›
              </button>
            )}
          </div>
          <div className="arch-lightbox-caption">
            <div>
              {active.category && <span className="arch-tag">{active.category}</span>}
              {active.title && <h3>{active.title}</h3>}
              {active.description && <p>{active.description}</p>}
            </div>
            {activePhotos.length > 1 && (
              <span className="arch-lightbox-count">
                {photoIndex + 1} / {activePhotos.length}
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
}