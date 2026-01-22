import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

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
        const { data, error } = await supabase
            .from('pentest_authorizations')
            .insert([
                {
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
                }
            ])
            .select();

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Failed to submit authorization' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: true, data },
            { status: 200 }
        );

    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
