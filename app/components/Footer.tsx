import Image from "next/image";
import Link from "next/link";
import { CONTACT, mailtoHref, mapsHref, SOCIAL, telHref } from "../lib/links";
import Reveal from "./Reveal";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Videos", href: "/videos" },
];

export default function Footer() {
  return (
    <footer className="bg-[#111111] p-6 text-white/80 sm:p-10 lg:p-20">
      <div className="mx-auto max-w-[1280px]">
        <Reveal variant="fade-up" className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Brand */}
          <div>
            <div className="inline-flex items-center justify-center rounded-2xl bg-white p-3">
              <Image
                src="/image/image-13-322.png"
                alt="Searcher Properties"
                width={140}
                height={70}
                className="h-12 w-auto"
              />
            </div>
            <p className="mt-6 text-base leading-relaxed text-white/70">
              Premium real estate development and investment company.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-lg font-medium text-white">Quick Links</h4>
            <ul className="mt-5 space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-base text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-medium text-white">Contact</h4>
            <ul className="mt-5 space-y-3 text-base text-white/70">
              <li>
                <a
                  href={telHref()}
                  className="transition-colors hover:text-white"
                >
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={mailtoHref()}
                  className="transition-colors hover:text-white"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={mapsHref(CONTACT.officeAddress)}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-white"
                >
                  {CONTACT.officeAddress}
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-lg font-medium text-white">Follow Us</h4>
            <div className="mt-5 flex items-center gap-3">
              <SocialLink label="Instagram" href={SOCIAL.instagram}>
                <InstagramIcon />
              </SocialLink>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 border-t border-white/10 pt-6 text-center">
          <p className="text-sm text-white/60">
            © 2026 Searcher Properties. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  children,
  label,
  href,
}: {
  children: React.ReactNode;
  label: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full bg-white/85 text-[#111111] transition-transform hover:-translate-y-0.5 hover:bg-white"
    >
      {children}
    </a>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}
