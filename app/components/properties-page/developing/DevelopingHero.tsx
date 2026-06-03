type Pill = {
  label: string;
  icon: React.ReactNode;
};

const PILLS: Pill[] = [
  { label: "High ROI Guaranteed", icon: <RoiIcon /> },
  { label: "Secure Investment", icon: <ShieldIcon /> },
  { label: "Limited Time Offers", icon: <ClockIcon /> },
];

export default function DevelopingHero() {
  return (
    <section
      id="developing-hero"
      className="relative isolate w-full overflow-hidden bg-slate-900 text-slate-50"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(34,60,133,0.5)_0%,_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(20,184,166,0.22)_0%,_transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      <div className="relative z-10 mx-auto flex max-w-[1280px] flex-col items-center justify-center px-6 pt-36 pb-20 text-center sm:px-10 sm:pt-44 sm:pb-24 lg:px-16 lg:pt-52 lg:pb-28">
        <h1
          className="animate-rise-in font-sans text-4xl font-medium leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[72px] xl:leading-[1.08]"
          style={{ animationDelay: "120ms" }}
        >
          Future Developments &amp;
          <br className="hidden sm:block" />{" "}
          <span className="text-brand-teal">Investment Opportunities</span>
        </h1>

        <p
          className="animate-rise-in mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg lg:mt-8 lg:text-xl lg:leading-9"
          style={{ animationDelay: "260ms" }}
        >
          Secure your future with exclusive early-stage property investments
          offering exceptional ROI potential.
        </p>

        <ul
          className="animate-rise-in mt-10 flex flex-wrap items-center justify-center gap-3 sm:mt-12 sm:gap-4 lg:mt-14"
          style={{ animationDelay: "420ms" }}
        >
          {PILLS.map((p, i) => (
            <li
              key={p.label}
              className="animate-pop-in inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-black/10 backdrop-blur sm:gap-3 sm:px-5 sm:py-3 sm:text-base"
              style={{ animationDelay: `${520 + i * 120}ms` }}
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-teal/15 text-brand-teal sm:h-8 sm:w-8">
                {p.icon}
              </span>
              {p.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function RoiIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M3 17l6-6 4 4 8-8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 7h7v7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M12 3l8 3v6c0 5-3.6 8.5-8 9-4.4-.5-8-4-8-9V6l8-3z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
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
