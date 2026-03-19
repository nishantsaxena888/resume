import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MinusIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const LinkItem = ({
  href,
  children,
  target,
  className,
  hasChildren,
  submenu_notation,
  onClick,
}: any) => {
  return (
    <Link
      href={href}
      target={target || "_self"}
      data-aos="fade-up"
      data-aos-duration="300" // same as duration-[0.3s]
      data-aos-easing="ease-in-out"
      className={cn(
        "font-Poppins font-light flex justify-between items-center gap-[10px] leading-[28px] tracking-[0.03rem]",
        className
      )}
      onClick={() => onClick?.()}
    >
      {children}{" "}
      {hasChildren ? (
        <span
          className={cn(
            submenu_notation === "circle"
              ? "border border-black inline-block rounded-full w-[6px] h-[6px]"
              : submenu_notation === "arrow"
              ? "border-2 translate-y-[-2px] inline-block border-r-0 border-t-0 -rotate-45 w-[6px] h-[6px]"
              : submenu_notation === "arrow-2"
              ? "border-1 translate-y-[-2px] border-black inline-block border-l-0 border-b-0 rotate-45 w-[6px] h-[6px]"
              : ""
          )}
        ></span>
      ) : null}
    </Link>
  );
};

const SubMenu = ({ menu, className, submenu_notation }: any) => {
  return (
    <ul
      className={cn(
        "dropdown transition-all duration-[0.3s] ease-in-out min-w-[150px] py-[10px] px-[10px] mt-[25px] absolute z-[16] text-left opacity-[0] invisible left-[0] right-[auto] bg-[#fff] block border-[1px] border-solid border-[#eee] block rounded-[10px]",
        className
      )}
    >
      {menu.map((item: any, index: number) => {
        return (
          <li key={index}>
            <LinkItem
              href={item.link}
              className={className}
              submenu_notation={submenu_notation}
            >
              {item.label}
            </LinkItem>
            {item.menu?.length > 0 ? (
              <SubMenu
                menu={item.menu}
                className={className}
                submenu_notation={submenu_notation}
              />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
};

export const MenuRender = ({
  menu,
  baseClass,
  menuClass,
  submenu_notation,
}: {
  menu: any;
  baseClass?: any;
  menuClass?: any;
  submenu_notation?: "circle" | "arrow" | undefined;
}) => {
  return (
    <div className={cn("", baseClass)}>
      {menu.map((item: any, index: number) => {
        return (
          <div className="custom-dropdown relative z-[5]" key={index}>
            <LinkItem
              href={item.link}
              hasChildren={item.menu?.length > 0}
              className={menuClass}
              submenu_notation={submenu_notation}
            >
              {item.label}
            </LinkItem>
            {item.menu?.length > 0 ? (
              <SubMenu
                menu={item.menu}
                className={menuClass}
                submenu_notation={submenu_notation}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

const MenuList = ({ menu, level }: any) => {
  return (
    <>
      {menu?.map((item: any) => {
        return (
          <div className="menu-item py-[5px] px-[15px]" key={item.label}>
            <LinkItem
              href={item.link}
              hasChildren={item.menu?.length > 0}
              submenu_notation={level === 0 ? "circle" : "arrow-2"}
            >
              {item.label}
            </LinkItem>

            {item.menu?.length > 0 ? (
              <div className="sub-menu min-w-max">
                <MenuList menu={item.menu} level={level + 1} />
              </div>
            ) : null}
          </div>
        );
      })}
    </>
  );
};

export const MenuWrapper = ({ menu }: any) => {
  return (
    <div className="menu-wrapper flex gap-4 text-left items-center">
      <MenuList menu={menu} level={0} />
    </div>
  );
};

const MenuAccordion = ({ children, label, link, onClick, level }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex justify-between ">
        <LinkItem
          href={link}
          onClick={onClick}
          className={cn(level === 0 ? "text-black hover:text-primary" : "")}
        >
          {label}
        </LinkItem>
        <Button
          variant={"link"}
          size={"icon"}
          className="p-0 w-au"
          onClick={() => setOpen(!open)}
        >
          {open ? <MinusIcon /> : <PlusIcon />}
        </Button>
      </div>
      {open ? <div className="pl-2">{children}</div> : null}
    </>
  );
};

export const MobileMenuItem = ({ menu, onClick, level }: any) => {
  return (
    <ul>
      {menu.map((item: any) => {
        return (
          <li className="relative" key={item.label}>
            {item.menu?.length > 0 ? (
              <MenuAccordion
                label={item.label}
                link={item.link}
                onClick={onClick}
                level={level}
              >
                <MobileMenuItem menu={item.menu} level={level + 1} />
              </MenuAccordion>
            ) : (
              <LinkItem
                href={item.link}
                className={cn(
                  level === 0 ? "text-black hover:text-primary" : ""
                )}
              >
                {item.label}
              </LinkItem>
            )}
          </li>
        );
      })}
    </ul>
  );
};
