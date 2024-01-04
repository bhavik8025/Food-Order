import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.REACT_APP_SUPBASE_PROJECT_URL, process.env.REACT_APP_SUPABASE_ANNON_KEY)

export default supabase;