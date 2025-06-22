import { createClient } from '@supabase/supabase-js';


// Initialize Supabase client
// Using direct values from project configuration
const supabaseUrl = 'https://upbsqlsehzqghxkxulmw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwYnNxbHNlaHpxZ2h4a3h1bG13Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1NDE5NDIsImV4cCI6MjA2NjExNzk0Mn0.zkXJOHsM94lEHi0P_Tr5JIzyHvwVzpGDC1yRIE2wDpI';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };