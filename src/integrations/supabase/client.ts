// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://udndllhsluxerhavequr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkbmRsbGhzbHV4ZXJoYXZlcXVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1NzA0NjIsImV4cCI6MjA2MDE0NjQ2Mn0.IP_-MbBscGp0O82c8dPlEqYzIqt5WhcJXArA3rbeVNE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);