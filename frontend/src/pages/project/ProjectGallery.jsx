import React from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaSearchPlus,
} from "react-icons/fa";
export default function ProjectGallery({
  gallery,
  activeImage,
  setActiveImage,
  title,
}) {
  const hasMultipleImages = gallery.length > 1;

  return (
    <section className="overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-3 shadow-2xl shadow-black/30 backdrop-blur-xl">
      <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-black/30">
        <div className="absolute left-4 top-4 z-10 rounded-full border border-white/10 bg-black/50 p-2.5 backdrop-blur-md">
          <FaSearchPlus className="text-white/80" />
        </div>

        <img
          src={gallery[activeImage]}
          alt={`${title} preview`}
          className="aspect-[4/3] w-full object-cover sm:aspect-[16/10] lg:aspect-[4/3]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {hasMultipleImages && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => setActiveImage((prev) => Math.max(prev - 1, 0))}
              disabled={activeImage === 0}
              className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-black/60 p-3 transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FaArrowLeft />
            </button>

            <button
              type="button"
              aria-label="Next image"
              onClick={() =>
                setActiveImage((prev) =>
                  Math.min(prev + 1, gallery.length - 1)
                )
              }
              disabled={activeImage === gallery.length - 1}
              className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-black/60 p-3 transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FaArrowRight />
            </button>
          </>
        )}
      </div>

      {hasMultipleImages && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
          {gallery.map((image, index) => (
            <button
              type="button"
              key={`${image}-${index}`}
              onClick={() => setActiveImage(index)}
              aria-label={`View image ${index + 1}`}
              className={`h-20 w-28 shrink-0 overflow-hidden rounded-xl border transition sm:h-24 sm:w-32 ${
                activeImage === index
                  ? "border-violet-400 ring-2 ring-violet-500/40"
                  : "border-white/10 opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={image}
                alt=""
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}