"use client";

import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";

type NavDropdownProps = {
  children: ReactNode;
};

export function NavDropdown({ children }: NavDropdownProps) {
  const pathname = usePathname();

  return <NavDropdownContent key={pathname}>{children}</NavDropdownContent>;
}

function NavDropdownContent({ children }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="nav-dropdown"
      data-open={isOpen}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={(event) => {
        if (event.target.matches(":focus-visible")) setIsOpen(true);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false);
      }}
      onClick={(event) => {
        if (event.target instanceof Element && event.target.closest("a")) {
          setIsOpen(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") setIsOpen(false);
      }}
    >
      {children}
    </div>
  );
}