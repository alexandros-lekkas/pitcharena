import { NextResponse, type NextRequest } from "next/server";

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

/**
 * This middleware is used to protect the routes that are not public. The
 * features built in that have been commented out are examples.
 *
 * If you edit this file, you can remove this docstring.
 *
 * @param request - The request object
 *
 * @returns The response object
 */
export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const { pathname } = request.nextUrl;

  // if (process.env.WAITLIST_ON === "true") {
  //   if (
  //     pathname.startsWith("/api") ||
  //     pathname === "/waitlist" ||
  //     pathname === "/auth/callback"
  //   ) {
  //     return response;
  //   }
  //   return NextResponse.redirect(new URL("/waitlist", request.url));
  // }

  const supabase = createMiddlewareClient({ req: request, res: response });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protect dashboard, startup/list, user, chats, bookmarks
  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/startup/list") ||
    pathname.startsWith("/user") ||
    pathname.startsWith("/chats") ||
    pathname.startsWith("/bookmarks")
  ) {
    if (!session) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  // Just for future use: session is available here
  // console.log('User session:', session);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
