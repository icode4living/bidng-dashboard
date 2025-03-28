/*import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from "iron-session";
import { sessionOptions } from '@/utils/session-helper';
import { SessionData } from './types/session';

export async function middleware(request: NextRequest) {
    const res = NextResponse.next();

   if(request.url.startsWith('/auth/signin')){
    return res;

   }

    // Retrieve session using Iron Session
    const session = await getIronSession<SessionData>(request, res, sessionOptions);

    // Ensure session persist
    if (session.token.length===0 && request.url.startsWith('/dashboard') ) {
        return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
    
    return res;
}


export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
*/


import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from "iron-session";
import { sessionOptions } from '@/utils/session-helper';
import { SessionData } from './types/session';

export async function middleware(request: NextRequest) {
    const res = NextResponse.next();
    const { pathname } = request.nextUrl; // Use pathname instead of url

    // Exclude authentication routes from session check
    if (pathname.startsWith('/auth/signin')) {
        return res;
    }

    // Retrieve session using Iron Session
    const session = await getIronSession<SessionData>(request, res, sessionOptions);

    // Ensure session exists before checking token
    if (!session || !session.token || session.token.length === 0) {
        if (pathname.startsWith('/dashboard')) {
            return NextResponse.redirect(new URL('/auth/signin', request.url));
        }
    }
    
    return res;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
