import React, { useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight, FaSearchPlus, FaTimes } from "react-icons/fa";

export default function ProjectGallery({ gallery, activeImage, setActiveImage, title }) {
  const hasMultipleImages = gallery.length > 1;
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const thumbRefs = useRef([]);

  const goPrev = () => setActiveImage((prev) => Math.max(prev - 1, 0));
  const goNext = () => setActiveImage((prev) => Math.min(prev + 1, gallery.length - 1));

  /* keep the active thumbnail visible as activeImage changes, whether the
     change came from a click, the arrow buttons, or the keyboard */
  useEffect(() => {
    thumbRefs.current[activeImage]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeImage]);

  /* arrow keys move through the gallery; Esc closes the lightbox */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setLightboxOpen(false);
        return;
      }
      if (!hasMultipleImages) return;
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hasMultipleImages]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [lightboxOpen]);

  const handleImgError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "/bg.png";
  };

  return (
    <section className="overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-3 shadow-2xl shadow-black/30 backdrop-blur-xl">
      <div className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-black/30">
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label="Enlarge image"
          className="absolute left-4 top-4 z-10 rounded-full border border-white/10 bg-black/50 p-2.5 backdrop-blur-md transition hover:bg-black/70"
        >
          <FaSearchPlus className="text-white/80" />
        </button>

        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label="Enlarge image"
          className="block w-full cursor-zoom-in"
        >
          <img
            src={gallery[activeImage]}
            alt={`${title} preview`}
            onError={handleImgError}
            className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-[1.02] sm:aspect-[16/10] lg:aspect-[4/3]"
          />
        </button>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {hasMultipleImages && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={goPrev}
              disabled={activeImage === 0}
              className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-black/60 p-3 transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FaArrowLeft />
            </button>

            <button
              type="button"
              aria-label="Next image"
              onClick={goNext}
              disabled={activeImage === gallery.length - 1}
              className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-black/60 p-3 transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FaArrowRight />
            </button>

            <span className="absolute bottom-4 right-4 z-10 rounded-full bg-black/60 px-3 py-1 text-xs text-white/80 backdrop-blur-md">
              {activeImage + 1} / {gallery.length}
            </span>
          </>
        )}
      </div>

      {hasMultipleImages && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
          {gallery.map((image, index) => (
            <button
              type="button"
              key={`${image}-${index}`}
              ref={(el) => (thumbRefs.current[index] = el)}
              onClick={() => setActiveImage(index)}
              aria-label={`View image ${index + 1}`}
              aria-current={activeImage === index}
              className={`h-20 w-28 shrink-0 overflow-hidden rounded-xl border transition sm:h-24 sm:w-32 ${
                activeImage === index
                  ? "border-violet-400 ring-2 ring-violet-500/40"
                  : "border-white/10 opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={image}
                alt=""
                onError={handleImgError}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close"
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <FaTimes size={18} />
          </button>

          <div className="relative max-h-[90vh] max-w-[92vw]" onClick={(e) => e.stopPropagation()}>
            <img
              src={gallery[activeImage]}
              alt={`${title} preview`}
              onError={handleImgError}
              className="max-h-[90vh] max-w-[92vw] rounded-xl object-contain shadow-2xl"
            />

            {hasMultipleImages && (
              <>
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                  disabled={activeImage === 0}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <FaArrowLeft />
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  disabled={activeImage === gallery.length - 1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <FaArrowRight />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}