import { NextRequest, NextResponse } from "next/server";
import { authService } from "../../../lib/firebase/server/app";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  try {
    const token = searchParams.get("idToken") || "";

    // verify
    await authService.verifyToken(token);

    const { session, maxAge } = await authService.createSessionCookie(token);

    await authService.auth.verifySessionCookie(session, true);

    const res = NextResponse.redirect(process.env.APP, 301);

    res.cookies.set("mind-session", session, {
      httpOnly: true,
      sameSite: true,
      secure: true,
      maxAge: maxAge,
    });

    return res;
  } catch (e) {
    return new Response("Forbidden", { status: 401 });
  }
}
