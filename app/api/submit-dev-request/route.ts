import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        const requiredFields = ['fullName', 'email', 'phone', 'niche', 'budgetRange', 'description', 'ndaAccepted'];
        for (const field of requiredFields) {
            if (!body[field] && body[field] !== false) {
                return NextResponse.json(
                    { error: `Missing required field: ${field}` },
                    { status: 400 }
                );
            }
        }

        // Ensure NDA is accepted
        if (!body.ndaAccepted) {
            return NextResponse.json(
                { error: 'NDA must be accepted to proceed' },
                { status: 400 }
            );
        }

        // Get client metadata
        const ipAddress = request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            'unknown';
        const userAgent = request.headers.get('user-agent') || 'unknown';

        // Insert into Supabase
        const { data, error } = await supabase
            .from('software_requests')
            .insert([
                {
                    full_name: body.fullName,
                    email: body.email,
                    phone: body.phone,
                    niche: body.niche,
                    budget_range: body.budgetRange,
                    description: body.description,
                    nda_accepted: body.ndaAccepted,
                    ip_address: ipAddress,
                    user_agent: userAgent,
                    status: 'pending'
                }
            ])
            .select();

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Failed to submit request', details: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Development request submitted successfully',
                data: data?.[0]
            },
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
