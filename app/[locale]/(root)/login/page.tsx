"use client";

import { signOut, useSession } from "next-auth/react";
import ROUTE from "@/lib/route";
import { FaGithub } from "react-icons/fa";

const LogoutButton = () => {
  const { data: session } = useSession();

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: ROUTE.PROFILE, redirect:true });
    } catch (error) {
      console.error("Error signing out:", error);
      // يمكنك إضافة تنبيه أو إشعار خطأ هنا
    }
  };

  if (!session) return null;

  return (
    <button
      onClick={handleSignOut}
      className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
    >
      <FaGithub size={20} /> تسجيل الخروج عبر GitHub
    </button>
  );
};

export default LogoutButton;
