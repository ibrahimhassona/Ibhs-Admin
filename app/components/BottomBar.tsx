"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { LuUser, LuCodeXml, LuFolder, LuNewspaper } from "react-icons/lu";
import { TbLogout } from "react-icons/tb";
const BottomBar = () => {
  const t = useTranslations("Sidebar");
  const pathname = usePathname();
  const navItems = [
    {
      title: t("profile"),
      href: "/",
      icon: <LuUser className="w-5 h-5" />,
      main: true,
    },
    {
      title: t("projects"),
      href: "/projects",
      icon: <LuFolder className="w-5 h-5" />,
      main: false,
    },
    {
      title: t("skills"),
      href: "/skills",
      icon: <LuCodeXml className="w-5 h-5" />,
      main: false,
    },
    {
      title: t("posts"),
      href: "/posts",
      icon: <LuNewspaper className="w-5 h-5" />,
      main: false,
    },
    {
      title: t("logout"),
      href: "/login",
      icon: <TbLogout className="w-5 h-5" />,
      main: false,
    },
  ];
  return (
    <nav className="fixed md:hidden h-[64px] max-[420px]:h-[50px] z-40 bottom-0 left-0 right-0 bg-background-light dark:bg-background-dark border-t borderColor">
      <div className="flex items-center justify-around p-1">
        {navItems.map((item) => {
          // ---- Is Active -----
          const isActive = pathname.split("/")[2] === item.href.slice(1);
          // ---- Is Profile -----
          const isProfile =
            pathname.split("/")[2] === undefined && item.main === true;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center p-2 rounded-lg cust-trans  
              ${
                isActive || isProfile
                  ? "hover:bg-primary/30 bg-primary/30 text-primary-dark"
                  : "hover:bg-background-dark/20 dark:hover:bg-background-light/20"
              }
              `}
            >
              {item.icon}
              <span className="text-xs font-bold mt-1 max-[420px]:hidden">{item.title}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomBar;
