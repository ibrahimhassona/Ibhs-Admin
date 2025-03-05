import { createClient } from "@supabase/supabase-js";

// ----- EnvironMent Variables -------

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

 const supabase = createClient(supabaseUrl, supabaseKey);
 export default supabase