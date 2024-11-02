import { createClient } from '@supabase/supabase-js'

// Replace with your own Supabase URL and Anon key
const supabaseUrl = 'https://unzkbvyeaefcpooqeenz.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuemtidnllYWVmY3Bvb3FlZW56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg4Njg2MDcsImV4cCI6MjA0NDQ0NDYwN30.mTzcMdIuOmwY8CGLc5PvQQywrjQWFQ_x7bJ0a7eY1r8' // Use VITE_ prefix for environment variables in Vite
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
