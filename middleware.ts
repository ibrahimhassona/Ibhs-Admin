import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { type NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);
export async function middleware(request: NextRequest) {
  const response = intlMiddleware(request);



  return response;
}

export const config = {
  matcher: [
    // استبعاد المسارات غير المرغوب فيها
    "/((?!api|_next|_vercel|.*\\..*).*)",
    // تطبيق خاص على مسار /users
    "/([\\w-]+)?/users/(.+)",
  ],
};
