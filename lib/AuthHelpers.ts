import { signIn, signOut } from "next-auth/react";
import ROUTE from "@/lib/route";

export const handleSignIn = async (setIsSigning: (state: boolean) => void) => {
  try {
    setIsSigning(true);
    await signIn("github", { callbackUrl: ROUTE.PROFILE });
  } catch (error) {
    console.error(error);
  } finally {
    setIsSigning(false);
  }
};

export const handleSignOut = async (setIsSigning: (state: boolean) => void) => {
  try {
    setIsSigning(true);
    await signOut({ callbackUrl: ROUTE.PROFILE });
  } catch (error) {
    console.error(error);
  } finally {
    setIsSigning(false);
  }
};
