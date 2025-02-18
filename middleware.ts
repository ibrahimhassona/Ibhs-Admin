import createMiddleware from "next-intl/middleware";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
const intlMiddleWare = createMiddleware(routing);
const allowEmail = process.env.ALLOWED_EMAIL
export async function middleware(req: NextRequest) {
  // 1------ Intl -----
  const res = intlMiddleWare(req);
  // 2------ SupaBase -----
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const publicPaths = ["/login"];
  if (
    (!user || user.email !== allowEmail) &&
    !publicPaths.some((path) => req.nextUrl.pathname.startsWith(path))
  ) {
    const loginUrl = new URL(`/login`, req.url);
    return NextResponse.redirect(loginUrl);
  }
  return res ;
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
    // However, match all pathnames within `/users`, optionally with a locale prefix
    "/([\\w-]+)?/users/(.+)",
  ],
};
