"use client";
import { useState } from "react";
import Link from "next/link";
import {
  LuUser,
  LuCodeXml,
  LuFolder,
  LuNewspaper,
} from "react-icons/lu";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  const navItems = [
    {
      href: "/profile",
      label: "الملف الشخصي",
      icon: <LuUser className="w-5 h-5" />,
    },
    {
      href: "/projects",
      label: "المشاريع",
      icon: <LuFolder className="w-5 h-5" />,
    },
    {
      href: "/skills",
      label: "المهارات",
      icon: <LuCodeXml className="w-5 h-5" />,
    },
    {
      href: "/posts",
      label: "المنشورات",
      icon: <LuNewspaper className="w-5 h-5" />,
    },
  ];

  return (
    <nav
      className={`h-full bg-background-light dark:bg-background-dark shadow-md absolute group  ${
        isHovered ? "w-64" : "w-16"
      } transition-all duration-300 max-md:absolute max-md:z-50`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* Desktop Toggle Button */}
      <div className="hidden md:block absolute top-4 -right-3">
        <button
          aria-label="تبديل القائمة الجانبية"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-background-light dark:bg-background-dark p-1 rounded-full shadow-lg border"
        >
        </button>
      </div>

      {/* Navigation Items */}
      <ul className={`space-y-4 p-4  cust-trans`}>
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`flex items-center h-[40px] gap-3 p-3 rounded-lg 
               
                ${
                  pathname === item.href
                    ? "bg-primary/20 text-primary"
                    : "hover:bg-background-dark/20 dark:hover:bg-background-light/20"
                }`}
            >
              <span className="min-w-[24px]">{item.icon}</span>
              <span
                className={` transition-all duration-500 flex text-nowrap overflow-hidden w-full ${
                  isHovered ? "opacity-100" : "opacity-0 "
                }`}
              >
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
