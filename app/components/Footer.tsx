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
              <SocialLink label="Facebook" href={SOCIAL.facebook}>
                <FacebookIcon />
              </SocialLink>
              <SocialLink label="Instagram" href={SOCIAL.instagram}>
                <InstagramIcon />
              </SocialLink>
              <SocialLink label="TikTok" href={SOCIAL.tiktok}>
                <TiktokIcon />
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

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12z" />
    </svg>
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

function TiktokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.83a8.16 8.16 0 0 0 4.77 1.52V6.9a4.85 4.85 0 0 1-1.84-.21z" />
    </svg>
  );
}
