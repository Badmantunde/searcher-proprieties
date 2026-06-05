"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type NavChild = { label: string; href: string };
type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Properties",
    href: "/properties",
    children: [
      { label: "Developing Properties", href: "/properties/developing" },
      { label: "Developed Properties", href: "/properties/developed" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Videos", href: "/videos" },
];

function isActivePath(current: string, target: string): boolean {
  if (target === "/") return current === "/";
  return current === target || current.startsWith(`${target}/`);
}

export default function Nav() {
  const pathname = usePathname() ?? "/";
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let lastY = typeof window !== "undefined" ? window.scrollY : 0;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 20);

      if (y < 80) {
        setVisible(true);
      } else if (y > lastY + 6) {
        setVisible(false);
      } else if (y < lastY - 6) {
        setVisible(true);
      }

      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when drawer is open & close on resize to desktop.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Close dropdown on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleMenuEnter = (label: string) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setOpenMenu(label);
  };

  const handleMenuLeave = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setOpenMenu(null), 150);
  };

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-transform duration-300 will-change-transform",
          visible ? "translate-y-0" : "-translate-y-full",
        ].join(" ")}
      >
        <div
          className={[
            "border-b backdrop-blur-xl transition-colors duration-300",
            scrolled
              ? "border-white/10 bg-slate-900/70 supports-[backdrop-filter]:bg-slate-900/55"
              : "border-white/10 bg-black/20 supports-[backdrop-filter]:bg-black/15",
          ].join(" ")}
        >
          <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-6 py-3 sm:px-10 sm:py-4 lg:px-16">
            <Link
              href="/"
              className="inline-flex items-center rounded-xl bg-white/95 px-3 py-1.5 shadow-md shadow-black/20 backdrop-blur"
              aria-label="Searcher Properties — Home"
              onClick={() => setOpen(false)}
            >
              <Image
                src="/image/image-13-322.png"
                alt="Searcher Properties"
                width={140}
                height={70}
                priority
                className="h-8 w-auto sm:h-9"
              />
            </Link>

            <ul className="hidden items-center gap-8 lg:flex">
              {NAV.map((item) => {
                const hasChildren = !!item.children?.length;
                const isOpen = openMenu === item.label;
                const isActive =
                  isActivePath(pathname, item.href) ||
                  !!item.children?.some((c) => isActivePath(pathname, c.href));

                return (
                  <li
                    key={item.label}
                    className="relative"
                    onMouseEnter={
                      hasChildren ? () => handleMenuEnter(item.label) : undefined
                    }
                    onMouseLeave={hasChildren ? handleMenuLeave : undefined}
                  >
                    <Link
                      href={item.href}
                      data-active={isActive}
                      aria-current={isActive ? "page" : undefined}
                      className={[
                        "nav-link flex items-center gap-1 text-base font-semibold transition-colors",
                        isActive ? "text-white" : "text-white/80 hover:text-white",
                      ].join(" ")}
                      aria-haspopup={hasChildren ? "menu" : undefined}
                      aria-expanded={hasChildren ? isOpen : undefined}
                    >
                      {item.label}
                      {hasChildren && (
                        <svg
                          width="10"
                          height="6"
                          viewBox="0 0 10 6"
                          fill="none"
                          aria-hidden
                          className={[
                            "transition-transform duration-200",
                            isOpen ? "rotate-180" : "",
                          ].join(" ")}
                        >
                          <path
                            d="M1 1l4 4 4-4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </Link>

                    {hasChildren && (
                      <div
                        role="menu"
                        aria-label={`${item.label} submenu`}
                        className={[
                          "absolute left-1/2 top-full z-50 mt-3 w-72 -translate-x-1/2 origin-top rounded-2xl border border-white/10 bg-slate-900/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl",
                          "transition-all duration-200",
                          isOpen
                            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                            : "pointer-events-none translate-y-1 scale-[0.98] opacity-0",
                        ].join(" ")}
                      >
                        {/* Hover bridge to keep dropdown open when crossing the gap */}
                        <span
                          aria-hidden
                          className="absolute -top-3 left-0 h-3 w-full"
                        />
                        <ul className="flex flex-col">
                          {item.children!.map((c) => {
                            const childActive = isActivePath(pathname, c.href);
                            return (
                            <li key={c.href}>
                              <Link
                                href={c.href}
                                onClick={() => setOpenMenu(null)}
                                role="menuitem"
                                aria-current={childActive ? "page" : undefined}
                                className={[
                                  "group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                                  childActive
                                    ? "bg-white/10 text-white"
                                    : "text-white/80 hover:bg-white/8 hover:text-white",
                                ].join(" ")}
                              >
                                <span>{c.label}</span>
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  aria-hidden
                                  className="-translate-x-1 text-white/40 opacity-0 transition-all group-hover:translate-x-0 group-hover:text-brand-teal group-hover:opacity-100"
                                >
                                  <path
                                    d="M9 6l6 6-6 6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </Link>
                            </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="hidden items-center gap-3 md:flex">
              <Link
                href="/properties"
                className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition-transform hover:-translate-y-0.5"
              >
                View Properties
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-white/70 px-5 py-2.5 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 lg:hidden"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={[
          "fixed inset-0 z-40 lg:hidden",
          open ? "" : "pointer-events-none",
        ].join(" ")}
        aria-hidden={!open}
      >
        <div
          className={[
            "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          ].join(" ")}
          onClick={() => setOpen(false)}
        />
        <aside
          className={[
            "absolute right-0 top-0 flex h-full w-80 max-w-[85vw] flex-col bg-slate-900/95 px-6 pb-6 pt-20 text-white shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-out",
            open ? "translate-x-0" : "translate-x-full",
          ].join(" ")}
        >
          <ul className="flex flex-1 flex-col gap-1 overflow-y-auto text-lg font-semibold">
            {NAV.map((item) => {
              const hasChildren = !!item.children?.length;
              const expanded = mobileExpanded === item.label;
              const isActive =
                isActivePath(pathname, item.href) ||
                !!item.children?.some((c) => isActivePath(pathname, c.href));

              return (
                <li key={item.label}>
                  <div
                    className={[
                      "flex items-stretch overflow-hidden rounded-xl transition-colors",
                      isActive ? "bg-white/10" : "",
                    ].join(" ")}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={[
                        "flex-1 border-l-2 px-4 py-3 transition-colors",
                        isActive
                          ? "border-brand-teal text-white"
                          : "border-transparent text-white/85 hover:bg-white/5 hover:text-white",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                    {hasChildren && (
                      <button
                        type="button"
                        aria-label={`${expanded ? "Collapse" : "Expand"} ${item.label} submenu`}
                        aria-expanded={expanded}
                        onClick={() =>
                          setMobileExpanded(expanded ? null : item.label)
                        }
                        className="grid w-12 place-items-center text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                      >
                        <svg
                          width="14"
                          height="9"
                          viewBox="0 0 10 6"
                          fill="none"
                          aria-hidden
                          className={[
                            "transition-transform duration-200",
                            expanded ? "rotate-180" : "",
                          ].join(" ")}
                        >
                          <path
                            d="M1 1l4 4 4-4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    )}
                  </div>

                  {hasChildren && (
                    <ul
                      className={[
                        "grid overflow-hidden text-base font-medium transition-[grid-template-rows] duration-300 ease-out",
                        expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                      ].join(" ")}
                    >
                      <li className="min-h-0">
                        <ul className="ml-3 mt-1 flex flex-col gap-1 border-l border-white/10 pl-3">
                          {item.children!.map((c) => {
                            const childActive = isActivePath(pathname, c.href);
                            return (
                              <li key={c.href}>
                                <Link
                                  href={c.href}
                                  onClick={() => setOpen(false)}
                                  aria-current={childActive ? "page" : undefined}
                                  className={[
                                    "block rounded-lg px-3 py-2.5 transition-colors",
                                    childActive
                                      ? "bg-white/10 text-white"
                                      : "text-white/70 hover:bg-white/5 hover:text-white",
                                  ].join(" ")}
                                >
                                  {c.label}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex flex-col gap-3 border-t border-white/10 pt-6">
            <Link
              href="/properties"
              onClick={() => setOpen(false)}
              className="rounded-full bg-brand px-6 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-brand/30"
            >
              View Properties
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="rounded-full border border-white/30 px-6 py-3 text-center text-sm font-semibold text-white/90 hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 6h16M4 12h16M4 18h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
