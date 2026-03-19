"use client";

import Image from "next/image";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";
import {
  MenuRender,
  MenuWrapper,
  MobileMenuItem,
} from "./dynamic-components/new/menu-render";
import { cn } from "@/lib/utils";
import { LocationSelector } from "./dynamic-components/new/location-selector";
import { LayoutGridIcon } from "lucide-react";
import { SearchBar } from "./dynamic-components/new/search-bar";
import { MiddleHeaderActions } from "./dynamic-components/new/middle-header-actions";

type MenuType = {
  label: string;
  link: string;
  widget: string;
  submenu_type?: "mega-menu" | "default" | "column";
  columns?: number;
  menu?: MenuType[];
};

type ClassNameType = {
  [key: string]: string | ClassNameType;
};

export default function Navbar(prop: any) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const TopBar = ({
    secondary_menu,
    slogan,
    className,
  }: {
    secondary_menu: MenuType;
    slogan: MenuType;
    className: ClassNameType;
  }) => {
    return (
      <div
        className={cn(
          "bg-[#3d4750] py-[6px] max-[991px]:hidden",
          className?.base
        )}
      >
        <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full">
            <div className="w-full px-[12px]">
              <div className=" flex justify-between">
                <div className="col-left-bar">
                  <MenuRender menu={slogan} menuClass={className.menu} />
                </div>
                <div className="col-right-bar ">
                  <MenuRender
                    menu={secondary_menu}
                    menuClass={className.menu + " cols px-[12px]"}
                    baseClass={"flex gap-[10px]"}
                    submenu_notation="arrow"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const MiddleBar = ({
    setOpen,
    appInfo,
    search,
    category_menu,
    wishlist,
    cart,
    my_account,
    visibility,
  }: {
    open: boolean;
    setOpen: (prop: boolean) => void;
    appInfo: any;
    search: any;
    category_menu: any;
    wishlist: any;
    cart: any;
    my_account: any;
    visibility: any;
  }) => {
    return (
      <div className="bottom-header py-[20px] max-[991px]:py-[15px]">
        <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full">
            <div className="w-full px-[12px]">
              <div className="inner-bottom-header flex justify-between max-[767px]:flex-col">
                <div className="cols bb-logo-detail flex max-[767px]:justify-between">
                  {/* Header Logo Start */}
                  <div className="header-logo flex items-center max-[575px]:justify-center">
                    <a href="index.html">
                      <Image
                        width={125}
                        height={43}
                        src={appInfo.logo_light}
                        alt="logo"
                        className="light w-[125px] max-[991px]:w-[115px] block"
                      />
                      <Image
                        width={125}
                        height={43}
                        src={appInfo.logo_dark}
                        alt="logo"
                        className="dark w-[125px] max-[991px]:w-[115px] hidden"
                      />
                    </a>
                  </div>
                  {/* Header Logo End */}
                  <button className="bb-sidebar-toggle bb-category-toggle hidden max-[991px]:flex max-[991px]:items-center max-[991px]:ml-[20px] max-[991px]:border-[1px] max-[991px]:border-solid max-[991px]:border-[#eee] max-[991px]:w-[40px] max-[991px]:h-[40px] max-[991px]:rounded-[15px] justify-center transition-all duration-[0.3s] ease-in-out font-Poppins text-[15px] text-primary font-light leading-[28px] tracking-[0.03rem]">
                    <LayoutGridIcon className="text-primary" />
                  </button>
                </div>
                <div className="cols flex justify-center">
                  {visibility?.search ? (
                    <SearchBar category_menu={category_menu} search={search} />
                  ) : null}
                </div>
                <div className="cols bb-icons flex justify-center">
                  <div className="bb-flex-justify max-[575px]:flex max-[575px]:justify-between">
                    <MiddleHeaderActions
                      setOpen={setOpen}
                      wishlist={wishlist}
                      cart={cart}
                      my_account={my_account}
                      visibility={visibility}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const BottomBar = ({ main_menu, location_menu, visibility }: any) => {
    return (
      <div className="bb-main-menu-desk bg-[#fff] py-[5px] border-t-[1px] border-solid border-[#eee] max-[991px]:hidden">
        <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full">
            <div className="w-full px-[12px]">
              <div className="bb-inner-menu-desk flex max-[1199px]:relative max-[991px]:justify-between">
                <button className="bb-header-btn bb-sidebar-toggle bb-category-toggle transition-all duration-[0.3s] ease-in-out h-[45px] w-[45px] mr-[30px] p-[8px] flex items-center justify-center bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px] relative max-[767px]:m-[0] max-[575px]:hidden">
                  <LayoutGridIcon className="text-primary" />
                </button>
                <button
                  className="navbar-toggler shadow-none hidden"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <i className="ri-menu-2-line" />
                </button>

                <div
                  className="bb-main-menu relative flex flex-[auto] justify-start max-[991px]:hidden"
                  id="navbarSupportedContent"
                >
                  <MenuWrapper menu={main_menu} />
                </div>
                <div className="bb-dropdown-menu flex items-center max-[991px]:hidden">
                  {visibility.location ? (
                    <LocationSelector menu={location_menu} />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const MobileMenu = ({
    setOpen,
    menu,
  }: {
    setOpen: (prop: boolean) => void;
    menu: any;
  }) => {
    return (
      <div id="bb-mobile-menu" className="px-4 py-4">
        <div className="bb-menu-title w-full pb-[10px] flex flex-wrap justify-between">
          <SheetTitle>
            <span className="menu_title font-Poppins flex items-center text-[16px] text-[#3d4750] font-semibold leading-[26px] tracking-[0.02rem]">
              My Menu
            </span>
          </SheetTitle>
          <button
            type="button"
            className="bb-close-menu relative border-[0] text-[30px] leading-[1] text-[#ff0000] "
            onClick={() => setOpen(false)}
          >
            ×
          </button>
        </div>
        <div className="bb-menu-inner ">
          <div className="bb-menu-content">
            <MobileMenuItem
              menu={menu}
              onClick={() => setOpen(false)}
              level={0}
            />
          </div>
          <div className="header-res-lan-curr hidden">
            {/* Social Start */}
            <div className="header-res-social mt-[30px]">
              <div className="header-top-social">
                <ul className="flex flex-row justify-center mb-[0]">
                  <li className="list-inline-item w-[30px] h-[30px] flex items-center justify-center bg-[#3d4750] rounded-[10px] mr-[.5rem]">
                    <a
                      href="#"
                      className="transition-all duration-[0.3s] ease-in-out"
                    >
                      <i className="ri-facebook-fill text-[#fff] text-[15px]" />
                    </a>
                  </li>
                  <li className="list-inline-item w-[30px] h-[30px] flex items-center justify-center bg-[#3d4750] rounded-[10px] mr-[.5rem]">
                    <a
                      href="#"
                      className="transition-all duration-[0.3s] ease-in-out"
                    >
                      <i className="ri-twitter-fill text-[#fff] text-[15px]" />
                    </a>
                  </li>
                  <li className="list-inline-item w-[30px] h-[30px] flex items-center justify-center bg-[#3d4750] rounded-[10px] mr-[.5rem]">
                    <a
                      href="#"
                      className="transition-all duration-[0.3s] ease-in-out"
                    >
                      <i className="ri-instagram-line text-[#fff] text-[15px]" />
                    </a>
                  </li>
                  <li className="list-inline-item w-[30px] h-[30px] flex items-center justify-center bg-[#3d4750] rounded-[10px]">
                    <a
                      href="#"
                      className="transition-all duration-[0.3s] ease-in-out"
                    >
                      <i className="ri-linkedin-fill text-[#fff] text-[15px]" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* Social End */}
          </div>
        </div>
      </div>
    );
  };

  return (
    <header
      id={prop.id || "header"}
      className=" relative z-[5] border-b-[1px] border-solid border-[#eee]"
    >
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        {prop?.visibility?.topbar ? (
          <TopBar
            secondary_menu={prop.links.secondary_menu}
            slogan={prop.links.slogan}
            className={prop.class_name.topbar}
          />
        ) : null}
        <MiddleBar
          open={menuOpen}
          setOpen={() => {
            setMenuOpen(!menuOpen);
          }}
          appInfo={prop.app_info}
          category_menu={prop.links.category}
          search={prop.links.search}
          my_account={prop.links.my_account}
          cart={prop.links.cart}
          wishlist={prop.links.wishlist}
          visibility={prop.visibility}
        />
        <BottomBar
          main_menu={prop.links.main_menu}
          location_menu={prop.links.location}
          className={prop.class_name.main_menu}
          visibility={prop.visibility}
        />

        <SheetContent className="max-[991px]:block hidden" side="left">
          <MobileMenu setOpen={setMenuOpen} menu={prop.links.main_menu} />
        </SheetContent>
      </Sheet>
    </header>
  );
}
