import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://putslwywdtakzwuisoks.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1dHNsd3l3ZHRha3p3dWlzb2tzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUwMzU5OTMsImV4cCI6MjAzMDYxMTk5M30.SywwS8LzDVnqc6wxhppTks2EpU7_7ABpTHZyHJwtBNs"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)