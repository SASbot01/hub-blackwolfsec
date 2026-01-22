import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
    if (supabaseInstance) {
        return supabaseInstance;
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing Supabase environment variables');
    }

    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
    return supabaseInstance;
}

// Export a getter function instead of the client directly
export const getSupabase = getSupabaseClient;

// For backward compatibility, export a proxy that calls the getter
export const supabase = new Proxy({} as SupabaseClient, {
    get: (target, prop) => {
        const client = getSupabaseClient();
        return (client as any)[prop];
    }
});
