"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center justify-center">
      <button
        name={`Toggle ${theme === "light" ? "Dark" : "Light"} Mode`}
        className={`relative inline-flex items-center w-12 h-6 rounded-full border-3 cust-trans ease-in-out
      ${
        theme === "light"
          ? "bg-background-dark/20 border-primary-dark hover:border-gray-400"
          : " bg-background-light/20 border-primary-dark "
      }
      focus:outline-none focus:ring-2 focus:ring-opacity-50
     focus:ring-primary-dark
      group`}
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        aria-label={`Toggle ${theme === "light" ? "Dark" : "Light"} Mode`}
      >
        {/* الشمس */}
        <svg
          className={`w-4 h-4 absolute left-1.5 transition-opacity cust-trans ${
            theme === "light" ? "opacity-100" : "opacity-0"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
        </svg>

        {/* القمر */}
        <svg
          className={`w-4 h-4 absolute right-1.5 transition-opacity duration-200 ${
            theme === "dark" ? "opacity-100" : "opacity-0"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </button>
    </div>
  );
}
