import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // ✅ تفعيل الوضع الداكن بناءً على `class="dark"`
  theme: {
    extend: {
      colors: {
        // 🎨 ألوان رئيسية مثل Supabase
        primary: {
          DEFAULT: "#3ECF8E", // اللون الاخضر
          dark: "#249F6B", // نسخة داكنة
          light: "#7FFFD4", // نسخة فاتحة
        },
        secondary: {
          DEFAULT: "#1E293B", // اللون الرمادى
          dark: "#0F172A",
          light: "#64748B",
        },
        background: {
          light: "#F8FAFC",
          dark: "#171717",
        },
        card: {
          light: "#FFFFFF",
          dark: "#1E293B",
        },
        text: {
          light: "#1E293B",
          dark: "#E2E8F0",
        },
      },
      fontFamily: {
  			cairo: [
  				'var(--font-cairo)'
  			],
  			'roboto': [
  				'var(--font-roboto)'
  			]
  		},
    },
  },
  plugins: [require("tailwindcss-animate", "tailwindcss-animated")],
} satisfies Config;

export default config;
