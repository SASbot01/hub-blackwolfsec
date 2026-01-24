import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
    try {
        // Initialize Supabase client directly
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        console.log('=== SUBMIT AUTHORIZATION API ===');
        console.log('Environment check:', {
            hasUrl: !!supabaseUrl,
            hasKey: !!supabaseAnonKey,
            url: supabaseUrl
        });

        if (!supabaseUrl || !supabaseAnonKey) {
            console.error('Missing Supabase environment variables');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        const body = await request.json();

        console.log('Request body received:', Object.keys(body));

        // Validate required fields
        const {
            organization,
            technicalResponsible,
            corporateEmail,
            assets,
            scopeTypes,
            intrusionLevel,
            emergencyContact,
            termsAccepted,
            selectedService
        } = body;

        if (!organization || !technicalResponsible || !corporateEmail || !assets || !intrusionLevel || !emergencyContact || !termsAccepted) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Get client metadata
        const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
        const userAgent = request.headers.get('user-agent') || 'unknown';

        // Insert into Supabase
        console.log('Attempting database insert...');
        const insertData = {
            organization,
            technical_responsible: technicalResponsible,
            corporate_email: corporateEmail,
            assets,
            scope_types: scopeTypes,
            intrusion_level: intrusionLevel,
            emergency_contact: emergencyContact,
            terms_accepted: termsAccepted,
            selected_service: selectedService,
            ip_address: ipAddress,
            user_agent: userAgent,
        };

        console.log('Insert data:', insertData);

        const { data, error } = await supabase
            .from('pentest_authorizations')
            .insert([insertData])
            .select();

        if (error) {
            console.error('=== SUPABASE ERROR ===');
            console.error('Error code:', error.code);
            console.error('Error message:', error.message);
            console.error('Error details:', error.details);
            console.error('Error hint:', error.hint);
            console.error('Full error:', JSON.stringify(error, null, 2));

            return NextResponse.json(
                {
                    error: 'Failed to submit authorization',
                    details: error.message,
                    code: error.code
                },
                { status: 500 }
            );
        }

        console.log('Insert successful:', data);

        return NextResponse.json(
            { success: true, data },
            { status: 200 }
        );

    } catch (error: any) {
        console.error('=== API CATCH ERROR ===');
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        console.error('Full error:', error);

        return NextResponse.json(
            {
                error: 'Internal server error',
                message: error.message
            },
            { status: 500 }
        );
    }
}
