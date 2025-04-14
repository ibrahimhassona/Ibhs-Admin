import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "./ui/alert-dialog"

  import { useTranslations } from "next-intl" // إذا كنت تستخدم الترجمة
  
  export function DeleteConfirmation({
    onConfirm,
    children
  }: {
    onConfirm: () => void;
    children: React.ReactNode;
    
  }) {
    const t = useTranslations("Profile");
  
    return (
      <AlertDialog >
        <AlertDialogTrigger asChild>
          <button
            className={`bg-red-600 hover:bg-red-500 p-2 cust-trans rounded-md text-white`}
          >
            {children}
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("delete_confirm_title")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("delete_confirm_message")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm}>
              {t("confirm")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  
  