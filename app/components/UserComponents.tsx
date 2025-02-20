import { useTranslations } from "next-intl";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

// مكون الأفاتار (الصورة الكبيرة)
export const UserAvatar = ({
  image,
  name,
}: {
  image?: string | null;
  name?: string | null;
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
    <FaUserCircle size={80} className="text-gray-400 border-4 border-primary" />
  );

// مكون الأيقونة (الصورة الصغيرة)
export const UserIcon = ({
  image,
  name,
}: {
  image?: string | null;
  name?: string | null;
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
    <FaUserCircle size={80} className="text-3xl text-gray-400 border-4 border-red-500 rounded-full" />
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
