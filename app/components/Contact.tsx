"use client";

import { CONTACT, mailtoHref, mapsHref, telHref, whatsappHref } from "../lib/links";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-[#f7f7f5] p-6 sm:p-10 lg:p-20"
    >
      <div className="mx-auto max-w-[1280px]">
        <Reveal variant="fade-up">
          <h2 className="text-3xl font-medium text-slate-900 sm:text-4xl lg:text-5xl">
            Get In Touch
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Info column (left) */}
          <Reveal variant="fade-right" className="space-y-7">
            <ContactRow
              icon={<PhoneIcon />}
              label="Phone"
              value={CONTACT.phoneDisplay}
              href={telHref()}
            />
            <ContactRow
              icon={<MailIcon />}
              label="Email"
              value={CONTACT.email}
              href={mailtoHref()}
            />
            <ContactRow
              icon={<LocationIcon />}
              label="Office"
              value={CONTACT.officeAddress}
              href={mapsHref(CONTACT.officeAddress)}
              external
            />

            <a
              href={whatsappHref()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-brand-green px-6 py-4 text-base font-semibold text-white shadow-lg shadow-brand-green/30 transition-transform hover:-translate-y-0.5"
            >
              <WhatsappIcon />
              Make Enquiry on Whatsapp
            </a>
          </Reveal>

          {/* Form card (right) */}
          <Reveal variant="fade-left" delay={150}>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="rounded-3xl border border-black/10 bg-white p-6 shadow-md shadow-black/5 sm:p-8"
            >
              <div className="space-y-4">
                <Field id="full-name" label="Full Name" />
                <Field id="email" label="Email Address" type="email" />
                <Field id="phone" label="Phone Number" type="tel" />
                <Field id="message" label="Your Message" textarea />
              </div>
              <button
                type="submit"
                className="mt-6 w-full rounded-full bg-brand py-4 text-base font-semibold text-white shadow-lg shadow-brand/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/30"
              >
                Send Message
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  type = "text",
  textarea,
}: {
  id: string;
  label: string;
  type?: string;
  textarea?: boolean;
}) {
  const baseClass =
    "w-full rounded-xl bg-[#f7f7f5] px-4 py-4 text-sm text-slate-900 placeholder:text-slate-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/30";
  return (
    <label htmlFor={id} className="block">
      <span className="sr-only">{label}</span>
      {textarea ? (
        <textarea
          id={id}
          rows={4}
          placeholder={label}
          className={`${baseClass} resize-none`}
        />
      ) : (
        <input id={id} type={type} placeholder={label} className={baseClass} />
      )}
    </label>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group flex items-center gap-5 transition-colors"
    >
      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-brand/15 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
        {icon}
      </span>
      <div>
        <div className="text-sm font-medium text-slate-900">{label}</div>
        <div className="text-base font-medium text-slate-700 transition-colors group-hover:text-brand">
          {value}
        </div>
      </div>
    </a>
  );
}

function PhoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M2 8l10 6 10-6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 22s7-7.58 7-13a7 7 0 1 0-14 0c0 5.42 7 13 7 13z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function WhatsappIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.149-.67.15-.198.297-.768.967-.94 1.166-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.371-.272.298-1.04 1.016-1.04 2.479 0 1.462 1.064 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.04 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982 1-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.436-9.884 9.889-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884zm8.412-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.336 11.893-11.893A11.821 11.821 0 0 0 20.452 3.488z" />
    </svg>
  );
}
