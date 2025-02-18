// middleware.ts
import { updateSession } from "./lib/supabase/middleware";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { type NextRequest } from 'next/server';

// 1. إنشاء middleware للتوجيه الدولي
const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  // 2. معالجة التوجيه الدولي أولاً
  const intlResponse = intlMiddleware(request);
  
  // 3. تحديث حالة الجلسة
  const sessionResponse = await updateSession(request);

  // 4. دمج الردود بشكل صحيح
  return  intlResponse ?? sessionResponse ; // الأهمية: استخدام ?? بدلاً من ||
}

// 5. تصحيح إعدادات الماتشر
export const config = {
  matcher: [
    // استبعاد المسارات غير المرغوب فيها
    '/((?!api|_next|_vercel|.*\\..*).*)',
    // تطبيق خاص على مسار /users
    '/([\\w-]+)?/users/(.+)'
  ]
};