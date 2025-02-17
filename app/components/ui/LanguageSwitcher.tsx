"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  // تبديل بين العربية والإنجليزية
  const toggleLanguage = () => {
    const newLocale = currentLocale === "ar" ? "en" : "ar";
    router.push(`/${newLocale}${pathname.substring(3)}`);
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`p-2 px-4 rounded-md text-sm cust-trans hover:text-primary ${currentLocale === "ar" ? 'font-roboto':'font-cairo'}`}
    >
      {currentLocale === "ar" ? "English" : "العربية"}
    </button>
  );
}
