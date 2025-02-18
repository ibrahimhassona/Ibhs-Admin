import React from "react";
import ThemeSwitcher from "../ui/ThemeSwitcher";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import Logo from "../ui/Logo";

const Nav = () => {
  return (
    <nav className="flex justify-between items-center cont  shadow-sm h-[68px] borderColor border-b">
      {/* -------- Theme & Logo ---------- */}
      <div className="flex items-center gap-2">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
      {/* -------- Logo ---------- */}
      <Logo/>
    </nav>
  );
};

export default Nav;
