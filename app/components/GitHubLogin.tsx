"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { handleSignIn, handleSignOut } from "@/lib/AuthHelpers";
import { UserAvatar, UserIcon, Loader } from "./UserComponents";
import { TbLogout } from "react-icons/tb";
import { useTranslations } from "next-intl";

export default function GitHubAuth() {
  const { data: session, status } = useSession();
  const [isSigning, setIsSigning] = useState(false);
  const t = useTranslations("login");

  if (status === "loading" || isSigning) return <Loader />;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4">
      <div className="m-auto gap-4 animate-fade-up max-w-[400px] max-sm:w-full w-full md:min-w-[300px] flex flex-col items-center justify-center h-[400px] rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        {session ? (
          <>
            <div className="flex flex-col items-center justify-center text-center gap-4">
              <UserAvatar
                image={session.user?.image || ""}
                name={session.user?.name || t("welcome_user")}
              />
              <div className="space-y-1">
                <p className="text-xl font-bold text-primary">
                  {session.user?.name || t("welcome_user")}
                </p>
                <p className="text-sm">{session.user?.email}</p>
              </div>
            </div>
            <button
              name="logout"
              aria-label="logout"
              onClick={() => handleSignOut(setIsSigning)}
              disabled={isSigning}
              className="flex items-center gap-2 bg-red-100 text-red-600 px-6 py-3 rounded-lg w-full justify-center hover:bg-red-200 cust-trans"
            >
              <TbLogout className="text-xl" />
              {t("logout")}
            </button>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center text-center gap-4">
              <UserIcon />
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-primary">{t("welcome")}</h2>
                <p className="text-gray-600">{t("login_message")}</p>
              </div>
            </div>
            <button
              aria-label="githublogin"
              name="githublogin"
              onClick={() => handleSignIn(setIsSigning)}
              disabled={isSigning}
              className="flex items-center gap-2 bg-primary/90 px-6 py-3 rounded-lg w-full justify-center hover:bg-primary cust-trans"
            >
              <FaGithub className="text-xl" />
              {t("github_login")}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
