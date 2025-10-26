"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { urlFor } from "@/lib/sanity/client";

interface ProjectGalleryProps {
  images: any[];
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
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
      {/* Gallery Grid with Captions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {images.map((image, index) => (
          <div key={index} className="group">
            <button
              onClick={() => openLightbox(index)}
              className="block w-full cursor-zoom-in relative"
            >
              <div className="relative aspect-[4/3] shadow-lg overflow-hidden group-hover:shadow-2xl transition-shadow duration-300">
                <Image
                  src={urlFor(image).width(800).url()}
                  alt={image.alt || `Gallery image ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </button>
            {image.caption && (
              <p className="mt-3 text-sm text-charcoal/70 leading-relaxed px-1">
                {image.caption}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 md:p-6"
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
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white hover:text-gold transition-colors z-10 p-2"
            aria-label="Close lightbox"
          >
            <X size={28} className="md:w-8 md:h-8" />
          </button>

          {/* Previous Button */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-2 md:left-6 text-white hover:text-gold transition-colors z-10 p-2"
              aria-label="Previous image"
            >
              <ChevronLeft size={36} className="md:w-12 md:h-12" />
            </button>
          )}

          {/* Image Container */}
          <div
            className="relative w-full max-w-6xl flex-1 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-h-[70vh] md:max-h-[80vh]">
              <Image
                src={urlFor(images[currentIndex]).width(2400).url()}
                alt={images[currentIndex].alt || `Gallery image ${currentIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </div>

          {/* Caption and Counter */}
          <div className="w-full max-w-4xl mt-4 md:mt-6 text-center px-4">
            {images[currentIndex].caption && (
              <p className="text-white text-sm md:text-base mb-3 leading-relaxed">
                {images[currentIndex].caption}
              </p>
            )}
            <div className="text-white/70 text-xs md:text-sm font-mono">
              {currentIndex + 1} / {images.length}
            </div>
          </div>

          {/* Next Button */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-2 md:right-6 text-white hover:text-gold transition-colors z-10 p-2"
              aria-label="Next image"
            >
              <ChevronRight size={36} className="md:w-12 md:h-12" />
            </button>
          )}
        </div>
      )}
    </>
  );
}
