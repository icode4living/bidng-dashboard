import { NextResponse } from "next/server";
import SessionHelper from "@/utils/session-helper";
import ApiClient from "@/utils/api-client";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { SessionData } from "@/types/session";

export async function POST(req: Request) {
  try {
    // Parse request body
    const { email, password } = await req.json();

    // Setup API Client
    const apiKey = process.env.API_KEY!;
    const baseURL = process.env.API_BASE_URL!;
    const apiClient = new ApiClient(baseURL, apiKey);

    console.log(`Login attempt: ${email}`);

    // Send login request
    const resp = await apiClient.postRequest("/admin/login", {
      identifier: email,
      password: password,
    });

    if (resp.status === 200) {
      const { user, token } = resp.data;

      // Save session using SessionHelper
      const session = await getIronSession<SessionData>(await cookies(), {
        password: process.env.SESSION_SECRET as string,
        cookieName: process.env.COOKIE_NAME as string,
        
        
      });
      session.user =user._id
      session.isLoggedIn = true
      session.permission = user.permissions
      session.token = token
      session.save()
/**
 *    user: user._id,
        email: user.email,
        isLoggedIn: true,
        permission: user.permissions,
        token: token,
 */
      // Redirect to /dashboard after login
      return NextResponse.redirect(new URL("/dashboard", req.url));
    } else {
      return NextResponse.json({ message: "Invalid username or password" }, { status: 401 });
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: `Internal Server Error: ${error}` }, { status: 500 });
  }
}
