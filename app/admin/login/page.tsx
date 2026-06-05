import type { Metadata } from "next";
import Image from "next/image";
import LoginForm from "./LoginForm";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const metadata: Metadata = {
  title: "Admin login — Searcher Properties",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="relative min-h-screen">
      <Image
        src="/developed-assets/img_7768-2-18.png"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900/85"
      />

      <div className="relative flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/95 p-8 shadow-2xl shadow-black/30 backdrop-blur-md">
          <div className="mb-8 flex justify-center">
            <Image
              src="/image/image-13-322.png"
              alt="Searcher Properties"
              width={160}
              height={80}
              priority
              className="h-12 w-auto"
            />
          </div>

          <h1 className="text-center text-2xl font-semibold text-slate-900">
            Admin login
          </h1>
          <p className="mt-2 text-center text-sm text-slate-600">
            Manage properties, images, and homepage listings.
          </p>

          <div className="mt-6">
            <LoginForm configured={isSupabaseConfigured()} />
          </div>
        </div>
      </div>
    </div>
  );
}
