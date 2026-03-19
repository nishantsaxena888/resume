// import { UserRoundIcon } from "lucide-react";
import Link from "next/link";
import React, { ReactNode } from "react";

export const HeaderActionIcon = ({
  label,
  link,
  children,
  icon,
}: {
  label: string;
  link: string;
  children: ReactNode;
  icon: any;
}) => {
  const Icons = icon;
  return (
    <Link
      href={link}
      className="bb-header-btn bb-wish-toggle transition-all duration-[0.3s] ease-in-out relative flex w-[auto] items-center ml-[30px] max-[1199px]:ml-[20px]"
      title="Wishlist"
    >
      <div className="header-icon relative flex">
        <Icons className="size-9 text-primary" strokeWidth={1} />
      </div>
      <div className="bb-btn-desc flex flex-col ml-[10px] max-[1199px]:hidden">
        <span className="bb-btn-title font-Poppins transition-all duration-[0.3s] ease-in-out text-[12px] leading-[1] text-[#3d4750] mb-[4px] tracking-[0.6px] capitalize font-medium whitespace-nowrap">
          {children}
        </span>
        <span className="bb-btn-stitle font-Poppins transition-all duration-[0.3s] ease-in-out text-[14px] leading-[16px] font-semibold text-[#3d4750]  tracking-[0.03rem] whitespace-nowrap">
          {label}
        </span>
      </div>
    </Link>
  );
};
