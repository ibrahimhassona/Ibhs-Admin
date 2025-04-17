"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-white group-[.toaster]:text-slate-950 group-[.toaster]:border-slate-200 group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-background-dark dark:group-[.toaster]:text-slate-50 dark:group-[.toaster]:border-gray-100/20 data-[type=error]:!bg-red-100 data-[type=error]:!text-red-800 dark:data-[type=error]:!bg-red-900 dark:data-[type=error]:!text-red-100 data-[type=success]:!bg-green-100 data-[type=success]:!text-green-800 dark:data-[type=success]:!bg-green-900 dark:data-[type=success]:!text-green-100 data-[type=info]:!bg-yellow-100 data-[type=info]:!text-yellow-800 dark:data-[type=info]:!bg-yellow-900 dark:data-[type=info]:!text-yellow-100 font-cairo  ",
          description: "group-[.toast]:text-slate-500 dark:group-[.toast]:text-slate-400",
          actionButton:
            "group-[.toast]:bg-slate-900 group-[.toast]:text-slate-50 dark:group-[.toast]:bg-slate-50 dark:group-[.toast]:text-slate-900",
          cancelButton:
            "group-[.toast]:bg-slate-100 group-[.toast]:text-slate-500 dark:group-[.toast]:bg-slate-800 dark:group-[.toast]:text-slate-400",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
