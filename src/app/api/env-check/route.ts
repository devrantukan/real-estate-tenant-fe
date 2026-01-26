import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        protocol: process.env.NEXT_PUBLIC_TYPESENSE_PROTOCOL,
        host: process.env.NEXT_PUBLIC_TYPESENSE_HOST,
        port: process.env.NEXT_PUBLIC_TYPESENSE_PORT,
    });
}
