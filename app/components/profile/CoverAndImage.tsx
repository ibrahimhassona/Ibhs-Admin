import { useTranslations } from "next-intl";
import { MemoizedImageComponent } from "./MemoizedImageComponent";

interface Data{
image:string,
cover:string
}

const CoverAndImage = ({ data, locale }: { data: Data; locale: string }) => {
  const t = useTranslations("Profile");
  return (
    <div className="flex items-center gap-6 max-lg:flex-col">
      {/* ---- Profile Image -----  */}
      <MemoizedImageComponent
        url={data?.image}
        title={t("changePersonalPhoto")}
        field="image"
        locale={locale}
      />
      {/* --------- Cover --------- */}
      <MemoizedImageComponent
        url={data?.cover}
        title={t("changePersonalCover")}
        field="cover"
        locale={locale}
      />
    </div>
  );
};

export default CoverAndImage;


