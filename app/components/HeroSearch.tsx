"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import {
  filterPropertySearch,
  type PropertySearchItem,
} from "@/lib/properties/search";

type Props = {
  items: PropertySearchItem[];
};

export default function HeroSearch({ items }: Props) {
  const router = useRouter();
  const listboxId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const suggestions = filterPropertySearch(items, query);

  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  useEffect(() => {
    setActiveIndex(suggestions.length > 0 && open ? 0 : -1);
  }, [query, open, suggestions.length]);

  function navigateTo(item: PropertySearchItem) {
    setOpen(false);
    setActiveIndex(-1);
    router.push(item.href);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const keyword = String(formData.get("q") || "").trim();

    if (activeIndex >= 0 && suggestions[activeIndex]) {
      navigateTo(suggestions[activeIndex]);
      return;
    }

    if (keyword) {
      const topMatch = filterPropertySearch(items, keyword, 1)[0];
      if (topMatch) {
        navigateTo(topMatch);
        return;
      }
    }

    const params = new URLSearchParams();
    if (keyword) params.set("q", keyword);
    const category = String(formData.get("category") || "");
    const contract = String(formData.get("contract") || "");
    if (category) params.set("category", category);
    if (contract) params.set("contract", contract);

    const qs = params.toString();
    router.push(qs ? `/properties?${qs}` : "/properties");
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!open || suggestions.length === 0) {
      if (e.key === "ArrowDown" && query.trim()) setOpen(true);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      navigateTo(suggestions[activeIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-brand p-3 shadow-2xl shadow-black/20 sm:p-4"
    >
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.1fr_auto]">
        <div ref={containerRef} className="relative">
          <div className="flex h-14 items-center rounded-xl bg-white px-5">
            <input
              name="q"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              onFocus={() => query.trim() && setOpen(true)}
              onKeyDown={onKeyDown}
              placeholder="Keyword"
              autoComplete="off"
              role="combobox"
              aria-expanded={open && suggestions.length > 0}
              aria-controls={listboxId}
              aria-autocomplete="list"
              aria-activedescendant={
                activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined
              }
              className="w-full bg-transparent text-base text-slate-700 placeholder:text-slate-500 focus:outline-none"
            />
          </div>

          {open && suggestions.length > 0 ? (
            <ul
              id={listboxId}
              role="listbox"
              className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 max-h-72 overflow-y-auto rounded-xl border border-slate-200 bg-white py-1 shadow-xl"
            >
              {suggestions.map((item, i) => (
                <li key={item.id} role="presentation">
                  <Link
                    id={`${listboxId}-option-${i}`}
                    role="option"
                    aria-selected={i === activeIndex}
                    href={item.href}
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo(item);
                    }}
                    className={`flex flex-col gap-0.5 px-4 py-3 transition-colors ${
                      i === activeIndex ? "bg-brand/10" : "hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-semibold text-slate-900">
                        {item.title}
                      </span>
                      <span className="shrink-0 rounded-full bg-brand/10 px-2 py-0.5 text-[11px] font-medium text-brand">
                        {item.typeLabel}
                      </span>
                    </span>
                    <span className="truncate text-xs text-slate-500">{item.location}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
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
            <option value="developed">Developed</option>
            <option value="developing">Developing</option>
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
