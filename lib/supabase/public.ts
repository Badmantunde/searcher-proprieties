import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import {
  getSupabaseAnonKey,
  getSupabaseUrl,
  isSupabaseConfigured,
} from "./env";

/** Cookie-free client for public reads (safe at build time / in generateStaticParams). */
export function createPublicClient() {
  return createSupabaseClient(getSupabaseUrl(), getSupabaseAnonKey());
}

export function getPublicClientOrNull() {
  if (!isSupabaseConfigured()) return null;
  return createPublicClient();
}
