import Link from "next/link";

import { ProductGallery } from "@/components/store/ProductGallery";
import { dictionaries, localizedPath, type Locale } from "@/lib/i18n/dictionaries";
import { getLocalizedValue } from "@/sanity/lib/localized";
import type { Product } from "@/sanity/lib/types";

type ProductCardProps = {
  locale: Locale;
  product: Product;
};

export function ProductCard({ locale, product }: ProductCardProps) {
  const copy = dictionaries[locale];
  const productPath = localizedPath(locale, `tienda/${product.slug}`);
  const name = getLocalizedValue(product.name, locale);
  const description = getLocalizedValue(product.description, locale);

  return (
    <article className="product-card">
      <div className="product-card__image">
        <ProductGallery
          images={product.images}
          locale={locale}
          productName={name}
          variant="card"
        />
        <Link
          aria-label={`${copy.product.open} ${name}`}
          className="product-card__image-link"
          href={productPath}
        />
        <span className="product-card__label">
          {copy.product.status[product.status]}
        </span>
      </div>
      <div className="product-card__details">
        <div>
          {product.category ? (
            <p className="eyebrow">
              {getLocalizedValue(product.category.name, locale)}
            </p>
          ) : null}
          <h3>
            <Link href={productPath}>{name}</Link>
          </h3>
        </div>
        <Link
          aria-label={`${copy.product.view} ${name}`}
          className="round-link"
          href={productPath}
        >
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <p className="product-card__description">
        {description}
      </p>
    </article>
  );
}