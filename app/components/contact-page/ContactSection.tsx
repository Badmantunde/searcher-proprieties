"use client";

import {
  CONTACT,
  mailtoHref,
  mapsHref,
  telHref,
  whatsappHref,
} from "../../lib/links";
import Reveal from "../Reveal";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="bg-white px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1240px]">
        <Reveal variant="fade-up">
          <h2 className="text-3xl font-medium text-slate-900 sm:text-4xl lg:text-5xl xl:text-[56px] xl:leading-[1.05]">
            Get In Touch
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          {/* Info column (left) */}
          <Reveal variant="fade-right" className="flex flex-col gap-8">
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
            <ContactRow
              icon={<ClockIcon />}
              label="Business hours"
              value={
                <>
                  Mon - Fri: 9AM - 6PM
                  <br />
                  Sat: 10AM - 4PM
                </>
              }
            />

            <a
              href={whatsappHref()}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex w-fit items-center gap-3 rounded-full bg-brand-green px-6 py-4 text-sm font-medium text-white shadow-lg shadow-brand-green/30 transition-transform hover:-translate-y-0.5 sm:text-base"
            >
              <WhatsappIcon />
              Make Enquiry on Whatsapp
            </a>
          </Reveal>

          {/* Form card (right) */}
          <Reveal variant="fade-left" delay={150}>
            <form
              className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_2px_24px_-8px_rgba(0,0,0,0.18)] sm:p-8 lg:p-10"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex flex-col gap-5 sm:gap-6">
                <Field id="full-name" label="Full Name" />
                <Field id="email" label="Email Address" type="email" />
                <Field id="phone" label="Phone Number" type="tel" />
                <Field id="message" label="Your Message" textarea />
              </div>
              <button
                type="submit"
                className="mt-7 w-full rounded-full bg-brand py-4 text-base font-medium text-white shadow-lg shadow-brand/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/30"
              >
                Send Message
              </button>
            </form>

            <p className="mt-5 text-center text-sm font-medium text-brand sm:text-base">
              Your Email Address Will not be Published
            </p>
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
    "w-full rounded-2xl bg-[#f7f7f5] px-5 py-4 text-sm text-slate-900 placeholder:text-slate-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/30 sm:text-base";
  return (
    <label htmlFor={id} className="block">
      <span className="sr-only">{label}</span>
      {textarea ? (
        <textarea
          id={id}
          rows={5}
          placeholder={label}
          className={`${baseClass} resize-none`}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={label}
          className={baseClass}
        />
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
  value: React.ReactNode;
  href?: string;
  external?: boolean;
}) {
  const inner = (
    <>
      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-brand-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
        {icon}
      </span>
      <div className="flex flex-col gap-1.5 pt-1">
        <span className="text-sm font-medium text-slate-600">{label}</span>
        <span className="text-base font-medium leading-relaxed text-slate-900 transition-colors group-hover:text-brand sm:text-lg">
          {value}
        </span>
      </div>
    </>
  );

  if (!href) {
    return <div className="flex items-start gap-5">{inner}</div>;
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group flex items-start gap-5"
    >
      {inner}
    </a>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 23 23"
      fill="currentColor"
      aria-hidden
    >
      <path d="M7.9575 9.6025C9.13062 11.6629 10.8371 13.3694 12.8975 14.5425L14.0025 12.995C14.1802 12.7462 14.4429 12.5711 14.741 12.5029C15.0391 12.4347 15.3518 12.4782 15.62 12.625C17.3876 13.5919 19.3401 14.173 21.3488 14.33C21.6622 14.3548 21.9548 14.4969 22.1682 14.7279C22.3816 14.9589 22.5 15.2618 22.5 15.5763V21.1538C22.5001 21.4632 22.3853 21.7618 22.178 21.9915C21.9706 22.2213 21.6854 22.3659 21.3775 22.3975C20.715 22.4658 20.0475 22.5 19.375 22.5C8.675 22.5 0 13.825 0 3.125C0 2.4525 0.0341667 1.785 0.1025 1.1225C0.134068 0.814622 0.27873 0.529401 0.508487 0.322042C0.738244 0.114684 1.03676 -6.66972e-05 1.34625 2.90841e-08H6.92375C7.2382 -3.93981e-05 7.54112 0.118439 7.7721 0.331813C8.00308 0.545187 8.14516 0.837779 8.17 1.15125C8.32696 3.15989 8.90807 5.11242 9.875 6.88C10.0218 7.1482 10.0653 7.46093 9.99708 7.75899C9.9289 8.05706 9.75383 8.3198 9.505 8.4975L7.9575 9.6025ZM4.805 8.78125L7.18 7.085C6.50582 5.63018 6.04402 4.08609 5.80875 2.5H2.5125C2.50417 2.70833 2.5 2.91667 2.5 3.125C2.5 12.445 10.055 20 19.375 20C19.5833 20 19.7917 19.9958 20 19.9875V16.6912C18.4139 16.456 16.8698 15.9942 15.415 15.32L13.7188 17.695C13.0359 17.4294 12.3726 17.1162 11.7338 16.7575L11.6613 16.7162C9.20963 15.3207 7.1793 13.2904 5.78375 10.8387L5.7425 10.7662C5.38348 10.1276 5.07019 9.46424 4.805 8.78125Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="24"
      height="20"
      viewBox="0 0 26 21"
      fill="none"
      aria-hidden
    >
      <path
        d="M0.75 4.7675L9.475 10.585C10.6787 11.3863 11.28 11.7875 11.93 11.9437C12.505 12.0812 13.1038 12.0812 13.6775 11.9437C14.3275 11.7875 14.9287 11.3863 16.1325 10.585L24.8575 4.7675M6.75 19.5H18.8575C20.9575 19.5 22.0075 19.5 22.81 19.0913C23.5151 18.7315 24.0883 18.1579 24.4475 17.4525C24.8575 16.65 24.8575 15.6 24.8575 13.5V6.75C24.8575 4.65 24.8575 3.6 24.4487 2.7975C24.0892 2.09192 23.5156 1.51827 22.81 1.15875C22.0075 0.75 20.9575 0.75 18.8575 0.75H6.75C4.65 0.75 3.6 0.75 2.7975 1.15875C2.09239 1.51848 1.51919 2.09211 1.16 2.7975C0.75 3.6 0.75 4.65 0.75 6.75V13.5C0.75 15.6 0.75 16.65 1.15875 17.4525C1.51827 18.1581 2.09192 18.7317 2.7975 19.0913C3.6 19.5 4.65 19.5 6.75 19.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M12 22s7-7.58 7-13a7 7 0 1 0-14 0c0 5.42 7 13 7 13z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="9.5"
        r="2.6"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 7.5V12l3 1.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsappIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.149-.67.15-.198.297-.768.967-.94 1.166-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.371-.272.298-1.04 1.016-1.04 2.479 0 1.462 1.064 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.04 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982 1-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.436-9.884 9.889-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884zm8.412-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.336 11.893-11.893A11.821 11.821 0 0 0 20.452 3.488z" />
    </svg>
  );
}
