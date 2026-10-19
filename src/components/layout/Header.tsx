import Image from "next/image";
import Link from "next/link";

import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { NavDropdown } from "@/components/layout/NavDropdown";
import { CategoryLinks } from "@/components/store/CategoryLinks";
import { dictionaries, localizedPath, type Locale } from "@/lib/i18n/dictionaries";
import { getCategories } from "@/sanity/lib/data";

type HeaderProps = {
  locale: Locale;
};

export async function Header({ locale }: HeaderProps) {
  const copy = dictionaries[locale];
  const categories = await getCategories();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link
          aria-label={`${copy.site.brand}, ${copy.navigation.home}`}
          className="wordmark"
          href={localizedPath(locale)}
        >
          <Image
            alt=""
            className="wordmark__logo"
            height={214}
            loading="eager"
            sizes="64px"
            src="/images/logo.png"
            width={289}
          />
          <span>{copy.site.brand}</span>
        </Link>
        <div className="header-tools">
          <nav aria-label={copy.navigation.label} className="main-nav">
            <NavDropdown>
              <Link
                className="nav-dropdown__trigger"
                href={localizedPath(locale, "tienda")}
              >
                {copy.navigation.pieces}
              </Link>
              <div
                aria-label={copy.navigation.categories}
                className="nav-dropdown__menu"
                role="group"
              >
                <CategoryLinks categories={categories} locale={locale} />
              </div>
            </NavDropdown>
            <Link href={localizedPath(locale, "taller")}>
              {copy.navigation.workshop}
            </Link>
            <Link href={localizedPath(locale, "contact")}>
              {copy.navigation.contact}
            </Link>
          </nav>
          <LanguageSwitcher locale={locale} label={copy.navigation.language} />
        </div>
      </div>
    </header>
  );
}

