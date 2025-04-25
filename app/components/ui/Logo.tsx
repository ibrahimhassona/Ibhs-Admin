import { useLocale } from "next-intl";
import Image from "next/image";
import React from "react";

const Logo = () => {
  const locale = useLocale();
  return (
    <div className="flex items-center gap-1 text-primary-dark">
      {/* <h1 className="font-bold text-xl max-md:text-sm ">IBHS</h1> */}
      <Image
        src={`/${locale}-logo.png`}
        height={70}
        width={70}
        priority
        quality={100}
        className="w-[80px] h-[80px] max-md:w-[60px] max-md:h-[60px]"
        alt="Logo DashBoard"
      />
    </div>
  );
};

export default Logo;
