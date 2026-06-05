import type { Metadata } from "next";
import LoginForm from "./LoginForm";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const metadata: Metadata = {
  title: "Admin login — Searcher Properties",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Admin login</h1>
        <p className="mt-2 text-sm text-slate-600">
          Manage properties, images, and homepage listings.
        </p>
        <div className="mt-6">
          <LoginForm configured={isSupabaseConfigured()} />
        </div>
      </div>
    </div>
  );
}
