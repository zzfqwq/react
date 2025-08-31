import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://egynubybzkmygufmqabq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVneW51YnliemtteWd1Zm1xYWJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2NDYyNDksImV4cCI6MjA3MjIyMjI0OX0.ZRGrhQnx8B7ntvVQ8Vocp3e3VUI9uVuGHpWyd3BGibM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
