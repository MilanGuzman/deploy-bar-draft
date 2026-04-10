import { createClient } from "@supabase/supabase-js";


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key"
);

export async function fetchReels()  {
    const { data, error } = await supabase
  .from('videos')
  .select('*')
  .eq('is_active', true)
  .order('order_index', { ascending: true })
  .limit(5)

  return {data, error}
}


