"use client";

import Image from "next/image";
import { useState } from "react";

import { dictionaries, type Locale } from "@/lib/i18n/dictionaries";
import { getLocalizedValue } from "@/sanity/lib/localized";
import type { ProductImage } from "@/sanity/lib/types";

type ProductGalleryProps = {
  images: ProductImage[];
  locale: Locale;
  productName: string;
  variant: "card" | "detail";
};

export function ProductGallery({
  images,
  locale,
  productName,
  variant,
}: ProductGalleryProps) {
  const copy = dictionaries[locale];
  const availableImages = images.filter(
    (image): image is ProductImage & { url: string } => Boolean(image.url),
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = availableImages[activeIndex];
  const hasMultipleImages = availableImages.length > 1;

  function showPreviousImage() {
    setActiveIndex((index) => (index - 1 + availableImages.length) % availableImages.length);
  }

  function showNextImage() {
    setActiveIndex((index) => (index + 1) % availableImages.length);
  }

  return (
    <div
      aria-label={`${productName} ${copy.product.gallery}`}
      className={`product-gallery product-gallery--${variant}`}
      role="group"
    >
      <div className="product-gallery__main">
        {activeImage ? (
          <Image
            alt={getLocalizedValue(activeImage.alt, locale) || productName}
            fill
            priority={variant === "detail"}
            sizes={
              variant === "card"
                ? "(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 33vw"
                : "(max-width: 760px) 100vw, 55vw"
            }
            src={activeImage.url}
          />
        ) : null}
        {hasMultipleImages ? (
          <>
            <button
              aria-label={copy.product.previousImage}
              className="product-gallery__control product-gallery__control--previous"
              onClick={showPreviousImage}
              type="button"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              aria-label={copy.product.nextImage}
              className="product-gallery__control product-gallery__control--next"
              onClick={showNextImage}
              type="button"
            >
              <span aria-hidden="true">→</span>
            </button>
            <span aria-live="polite" className="product-gallery__counter">
              {activeIndex + 1} / {availableImages.length}
            </span>
          </>
        ) : null}
      </div>
      {variant === "detail" && hasMultipleImages ? (
        <div className="product-gallery__thumbnails">
          {availableImages.map((image, index) => (
            <button
              aria-current={index === activeIndex}
              aria-label={`${copy.product.selectImage} ${index + 1}`}
              className="product-gallery__thumbnail"
              key={`${image.url}-${index}`}
              onClick={() => setActiveIndex(index)}
              type="button"
            >
              <Image
                alt={getLocalizedValue(image.alt, locale) || productName}
                height={96}
                src={image.url}
                width={96}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}