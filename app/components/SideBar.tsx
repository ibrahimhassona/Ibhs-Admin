"use client";
import { useState } from "react";
import Link from "next/link";
import { LuUser, LuCodeXml, LuFolder, LuNewspaper } from "react-icons/lu";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { TbLogout } from "react-icons/tb";

export default function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("Sidebar");
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
    <nav
      className={`h-full bg-background-light dark:bg-background-dark shadow-md absolute group borderColor border-e ${
        isHovered ? "w-64" : "w-[70px]"
      } cust-trans max-md:absolute max-md:hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ... keep toggle button the same */}

      <ul className={`flex flex-col gap-3 p-4 cust-trans `}>
        {navItems.map((item) => {
          // ---- Is Active -----
          const isActive = pathname.split("/")[2] === item.href.slice(1);
          // ---- Is Profile -----
          const isProfile =
            pathname.split("/")[2] == undefined && item.main == true;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center h-[40px] gap-3 p-2 rounded-lg cust-trans
                  ${
                    isActive || isProfile
                      ? "bg-primary/20 text-primary"
                      : "text-foreground/60 dark:text-foreground-dark/60"
                  }
                  ${
                    isActive || isProfile
                      ? "hover:bg-primary/30" // Different hover for active state
                      : "hover:bg-background-dark/20 dark:hover:bg-background-light/20"
                  }`}
              >
                <span className={`min-w-[24px] flex items-center text-center `}>
                  {item.icon}
                </span>
                <span
                  className={`transition-all duration-500 flex text-nowrap overflow-hidden w-full ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {item.title}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
