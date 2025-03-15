import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from "iron-session";
import { sessionOptions } from '@/utils/session-helper';
import { SessionData } from './types/session';

export async function middleware(request: NextRequest) {
    const res = NextResponse.next();

    // Exclude authentication routes from session check
    if (request.nextUrl.pathname.startsWith('/auth/signin')) {
        return res;
    }

    // Retrieve session using Iron Session
    const session = await getIronSession<SessionData>(request, res, sessionOptions);

    // Ensure session persist
    if (!session.isLoggedIn) {
        return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    return res;
}


export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
