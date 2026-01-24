import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        console.log('=== SUPABASE CONNECTION TEST ===');
        console.log('URL exists:', !!supabaseUrl);
        console.log('Key exists:', !!supabaseAnonKey);
        console.log('URL:', supabaseUrl);

        if (!supabaseUrl || !supabaseAnonKey) {
            return NextResponse.json({
                error: 'Missing environment variables',
                details: {
                    hasUrl: !!supabaseUrl,
                    hasKey: !!supabaseAnonKey
                }
            }, { status: 500 });
        }

        const supabase = createClient(supabaseUrl, supabaseAnonKey);

        // Test connection by querying the table
        const { data, error, count } = await supabase
            .from('pentest_authorizations')
            .select('*', { count: 'exact', head: true });

        if (error) {
            console.error('Supabase query error:', error);
            return NextResponse.json({
                error: 'Database query failed',
                details: error
            }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: 'Database connection successful',
            tableExists: true,
            rowCount: count
        }, { status: 200 });

    } catch (error: any) {
        console.error('Test endpoint error:', error);
        return NextResponse.json({
            error: 'Test failed',
            message: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
