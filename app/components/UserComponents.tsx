import { useTranslations } from "next-intl";
import Image from "next/image";

// مكون الأفاتار (الصورة الكبيرة)
export const UserAvatar = ({
  image,
  name,
  locale
}: {
  image?: string | null;
  name?: string | null;
  locale:string
}) =>
  image ? (
    <Image
      quality={90}
      height={200}
      width={200}
      priority
      src={image}
      alt={name || "User avatar"}
      className="w-40 h-40 max-md:w-32 max-md:h-32 rounded-full object-cover border-4 border-primary shadow-lg"
    />
  ) : (
    <Image
        src={`/${locale}-logo.png`}
        height={100}
        width={100}
        priority
        quality={100}
        className="w-[160px] h-[100px] max-md:w-[160px] max-md:h-[100px]"
        alt="Logo DashBoard"
      />
  );

// مكون الأيقونة (الصورة الصغيرة)
export const UserIcon = ({
  image,
  name,
  locale
}: {
  image?: string | null;
  name?: string | null;
  locale:string
}) =>
  image ? (
    <Image
      quality={90}
      height={200}
      width={200}
      priority
      src={image}
      alt={name || "User icon"}
      className="w-10 h-10 rounded-full object-cover border-2 border-primary shadow-md"
    />
  ) : (
    <Image
            src={`/${locale}-logo.png`}
            height={100}
            width={100}
            priority
            quality={100}
            className="w-[160px] h-[160px] max-md:w-[100px] max-md:h-[100px]"
            alt="Logo DashBoard"
          />
  );

// مكون التحميل (Loader)
export const Loader = () => {
  const t = useTranslations('login');
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary" />
      <p className="animate-pulse">{t("loader_message")}</p>
    </div>
  );
};
