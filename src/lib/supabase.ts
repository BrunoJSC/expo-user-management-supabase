import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ivzebafvpsjeglbacobe.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2emViYWZ2cHNqZWdsYmFjb2JlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgyMDk3NTQsImV4cCI6MTk5Mzc4NTc1NH0.zzznqGyMTDcZUH2hFlAQPBlKMHfY8YCxAKal938D3c4";

export const supabse = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
