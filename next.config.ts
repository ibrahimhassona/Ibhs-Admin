import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["avatars.githubusercontent.com","csrxorwdokqeuhexiyjf.supabase.co","mydsfjnfsyjrbcltsgrb.supabase.co"],
  },
};

export default withNextIntl(nextConfig);
