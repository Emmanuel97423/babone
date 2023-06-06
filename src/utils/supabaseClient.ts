import { createClient } from "@supabase/supabase-js";

const supabaseUrl:string = import.meta.env.VITE_SUPA_URL || import.meta.env.TAURI_SUPA_URL;
const supabasePrivateKey:string = import.meta.env.VITE_SUPA_API_PRIVATE_KEY;

export const supabase = createClient(supabaseUrl, supabasePrivateKey)