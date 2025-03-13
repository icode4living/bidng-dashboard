import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function GET() {
  const session = await getIronSession(await cookies(), {
    password: process.env.SESSION_SECRET as string,
    cookieName: process.env.COOKIE_NAME as string,
  });

  // Destroy the session
  session.destroy();

  // Redirect to login page
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/auth/signin`);
}
