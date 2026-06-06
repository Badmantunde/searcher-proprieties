import Image from "next/image";
import Link from "next/link";
import HeroSearch from "./HeroSearch";
import { getSearchableProperties } from "@/lib/properties/fetch";

export default async function Header() {
  const searchItems = await getSearchableProperties();

  return (
    <section
      id="home"
      className="relative min-h-[92vh] w-full overflow-hidden text-slate-50 sm:min-h-[720px] lg:min-h-[820px]"
    >
      <Image
        src="/image/image-1-2.png"
        alt="Sunset balcony"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_30%] scale-105 sm:scale-100 sm:object-center lg:object-[center_40%]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80 sm:from-black/55 sm:via-black/45 sm:to-black/70" />

      <div className="relative z-10 mx-auto flex max-w-[1440px] flex-col px-6 pb-32 sm:px-10 sm:pb-40 lg:px-16 lg:pb-48">
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

          <div
            className="animate-rise-in mt-10 w-full max-w-5xl"
            style={{ animationDelay: "520ms" }}
          >
            <HeroSearch items={searchItems} />
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
