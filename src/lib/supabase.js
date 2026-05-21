import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export async function savePainRecord(record) {
  if (!supabase) return;
  const { error } = await supabase.from("pain_records").insert([record]);
  if (error) console.warn("Supabase save failed:", error.message);
}
