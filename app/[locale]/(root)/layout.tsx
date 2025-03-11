import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Prtofolio Admin",
  description: "",
};
import type { ReactNode } from "react";
import Nav from "../../components/navigation/Nav";
import BottomBar from "../../components/BottomBar";
import Sidebar from "../../components/SideBar";
import { auth } from "@/auth";
import GitHubLogin from "@/app/components/GitHubLogin";
export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
// const user=session?.user?.email==
console.log(session)
  return (
    <>
      <Nav />
      {/* Main Content */}
      <div className="  mx-auto h-[calc(100vh-68px)] gap-2 flex max-md:flex-col max-md:overflow-hidden relative">
        <Sidebar />
        <BottomBar />
        <main className="h-[calc(100vh-68px)] overflow-y-auto py-4 w-full cont md:ms-16 xl:ms-0 max-md:pb-[70px]">
          {/* {children} */}
          {session?.user?.email===process.env.ALLOWED_EMAIL ? children : <GitHubLogin />}
        </main>
      </div>
    </>
  );
}
