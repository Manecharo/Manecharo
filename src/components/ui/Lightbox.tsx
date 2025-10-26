"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { urlFor } from "@/lib/sanity/client";

interface LightboxProps {
  images: any[];
}

export default function Lightbox({ images }: LightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="space-y-8">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className="block w-full cursor-zoom-in group"
          >
            <div className="relative aspect-[16/10] overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
              <Image
                src={urlFor(image).width(1200).url()}
                alt={image.alt || `Gallery image ${index + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery lightbox"
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-gold transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>

          {/* Previous Button */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-6 text-white hover:text-gold transition-colors z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={48} />
            </button>
          )}

          {/* Image */}
          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full mx-6"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={urlFor(images[currentIndex]).width(2400).url()}
              alt={images[currentIndex].alt || `Gallery image ${currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          {/* Next Button */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-6 text-white hover:text-gold transition-colors z-10"
              aria-label="Next image"
            >
              <ChevronRight size={48} />
            </button>
          )}

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
