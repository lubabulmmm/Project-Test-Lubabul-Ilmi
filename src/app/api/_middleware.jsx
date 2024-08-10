import { NextResponse } from 'next/server';

export async function middleware(req) {
    const url = req.nextUrl.clone();
    url.pathname = url.pathname.replace(/^\/api\/proxy/, '');
    const response = await fetch(`https://suitmedia-backend.suitdev.com/api/ideas${url.search}`, {
        headers: {
            'Content-Type': 'application/json',            
        },
    });

    const data = await response.json();
    return NextResponse.json(data);
}
