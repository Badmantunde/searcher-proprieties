import {
  CONTACT,
  mailtoHref,
  telHref,
  whatsappHref,
} from "../../lib/links";
import { CalendarIcon, ChatBubbleIcon } from "./icons";

type Props = {
  propertyTitle: string;
};

export default function PropertyContactCard({ propertyTitle }: Props) {
  const enquiryHref = whatsappHref(
    `Hi! I'd like to enquire about ${propertyTitle}.`,
  );
  const inspectionHref = mailtoHref(CONTACT.email, {
    subject: `Book inspection: ${propertyTitle}`,
  });

  return (
    <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-[10px_10px_30px_-10px_rgba(0,0,0,0.45)] sm:rounded-3xl sm:p-8 lg:p-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:gap-14">
          <div>
            <h2 className="text-xl font-medium leading-tight sm:text-2xl lg:text-[28px]">
              Interested in this property?
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
              Get in touch with our agents for more information, schedule a
              viewing, or make an enquiry.
            </p>
          </div>

          <div className="flex flex-col gap-1.5 sm:gap-2">
            <p className="text-sm font-medium text-white sm:text-base">
              Contact Information
            </p>
            <a
              href={telHref()}
              className="text-base font-medium tracking-wide text-white transition-opacity hover:opacity-80 sm:text-lg"
            >
              {CONTACT.phoneDisplay}
            </a>
            <a
              href={mailtoHref()}
              className="break-all text-sm text-white/80 transition-opacity hover:opacity-100 sm:text-base"
            >
              {CONTACT.email}
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4 lg:min-w-[220px]">
          <a
            href={enquiryHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-emerald-900/30 transition-transform hover:-translate-y-0.5 sm:px-8 sm:py-4 sm:text-base"
          >
            <ChatBubbleIcon />
            Make Enquiry
          </a>
          <a
            href={inspectionHref}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-brand bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-900/30 transition-transform hover:-translate-y-0.5 sm:px-8 sm:py-4 sm:text-base"
          >
            <CalendarIcon />
            Book Inspection
          </a>
        </div>
      </div>
    </div>
  );
}
