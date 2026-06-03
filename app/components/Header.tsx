import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <section
      id="home"
      className="relative w-full overflow-hidden text-slate-50"
    >
      <Image
        src="/image/image-1-2.png"
        alt="Sunset balcony"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/70" />

      <div className="relative z-10 mx-auto flex max-w-[1440px] flex-col px-6 pb-32 sm:px-10 sm:pb-40 lg:px-16 lg:pb-48">
        {/* Hero copy (sits below the fixed Nav) */}
        <div className="flex w-full flex-col items-center pt-32 text-center sm:pt-40 lg:pt-52">
          <h1
            className="font-display animate-rise-in max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-[88px] xl:leading-[1.05]"
            style={{ animationDelay: "120ms" }}
          >
            Find Your Dream
            <br />
            Property
          </h1>
          <p
            className="animate-rise-in mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg lg:text-xl"
            style={{ animationDelay: "320ms" }}
          >
            Premium homes and investment properties built with trust, quality,
            and long-term value.
          </p>

          {/* Search bar — 40px below subtitle */}
          <div
            className="animate-rise-in mt-10 w-full max-w-5xl"
            style={{ animationDelay: "520ms" }}
          >
            <form
              action="/properties"
              method="get"
              className="rounded-2xl bg-brand p-3 shadow-2xl shadow-black/20 sm:p-4"
            >
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.1fr_auto]">
                <div className="flex h-14 items-center rounded-xl bg-white px-5">
                  <input
                    name="q"
                    placeholder="Keyword"
                    className="w-full bg-transparent text-base text-slate-700 placeholder:text-slate-500 focus:outline-none"
                  />
                </div>
                <div className="flex h-14 items-center justify-between rounded-xl bg-white px-5">
                  <select
                    name="category"
                    defaultValue=""
                    className="w-full appearance-none bg-transparent text-base text-slate-500 focus:outline-none"
                  >
                    <option value="" disabled>
                      Categories
                    </option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="land">Land</option>
                  </select>
                  <Chevron />
                </div>
                <div className="flex h-14 items-center justify-between rounded-xl bg-white px-5">
                  <select
                    name="contract"
                    defaultValue=""
                    className="w-full appearance-none bg-transparent text-base text-slate-500 focus:outline-none"
                  >
                    <option value="" disabled>
                      Contract Types
                    </option>
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                    <option value="lease">For Lease</option>
                  </select>
                  <Chevron />
                </div>
                <button
                  type="submit"
                  className="h-14 rounded-xl bg-brand px-8 text-base font-semibold text-white ring-1 ring-white/30 transition-colors hover:bg-[#1a3070]"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          <div
            className="animate-rise-in mt-8 flex flex-col items-center gap-4 sm:flex-row md:hidden"
            style={{ animationDelay: "620ms" }}
          >
            <Link
              href="/properties"
              className="rounded-full bg-brand px-8 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              View Properties
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/70 px-8 py-3.5 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Chevron() {
  return (
    <svg
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
      className="ml-2 shrink-0 text-slate-500"
      aria-hidden
    >
      <path
        d="M1 1l6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
