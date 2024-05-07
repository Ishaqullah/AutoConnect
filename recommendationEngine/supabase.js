import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://putslwywdtakzwuisoks.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1dHNsd3l3ZHRha3p3dWlzb2tzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNTAzNTk5MywiZXhwIjoyMDMwNjExOTkzfQ.juq562RtAeM_BvvG2GyD2Io95d4fapRxec9JmgZNzQQ"

export const supabase = createClient(supabaseUrl, supabaseKey)