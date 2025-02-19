// import { signIn } from "next-auth/react";
"use client"
import ROUTE from "@/lib/route";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";

export default function GitHubLogin() {
    const handleSignIn = async (provider: "github" | "google") => {
        try {
          await signIn(provider, {
            callbackUrl: ROUTE.PROFILE,
            redirect: false,
          });
        } catch (error) {
          console.log(error);
          //   ----- Alert Error --------
        }
      };
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <p className="mb-4 text-lg font-semibold">يرجى تسجيل الدخول للمتابعة</p>
      <button 
       onClick={() => handleSignIn("github")}
        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
      >
        <FaGithub size={20} /> تسجيل الدخول عبر GitHub
      </button>
    </div>
  );
}
