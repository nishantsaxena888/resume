// "use client"
import React from "react";
import HeaderTop from "./header/HeaderTop";
import HeaderCenter from "./header/HeaderCenter";
import HeaderBottom from "./header/HeaderBottom";

const Header = ({
  top_header,
  main_menu,
  logo,
  my_account_menus,
  login_menus,
}: any) => {
  // const menus = [
  //   {
  //     type: "link",
  //     label: "Home",
  //     href: "/",
  //   },
  //   {
  //     type: "mega",
  //     label: "Categories",
  //     groups: [
  //       {
  //         label: "Classic",
  //         items: [
  //           {
  //             label: "Left sidebar 3 column",
  //             href: "/shop-left-sidebar-col-3",
  //           },
  //           {
  //             label: "Left sidebar 4 column",
  //             href: "/shop-left-sidebar-col-4",
  //           },
  //           {
  //             label: "Right sidebar 3 column",
  //             href: "/shop-right-sidebar-col-3",
  //           },
  //           {
  //             label: "Right sidebar 4 column",
  //             href: "/shop-right-sidebar-col-4",
  //           },
  //           {
  //             label: "Full width 4 column",
  //             href: "/shop-full-width-col-4",
  //           },
  //         ],
  //       },
  //       {
  //         label: "Banner",
  //         items: [
  //           {
  //             label: "Left sidebar 3 column",
  //             href: "/shop-banner-left-sidebar-col-3",
  //           },
  //           {
  //             label: "Left sidebar 4 column",
  //             href: "/shop-banner-left-sidebar-col-4",
  //           },
  //           {
  //             label: "Right sidebar 3 column",
  //             href: "/shop-banner-right-sidebar-col-3",
  //           },
  //           {
  //             label: "Right sidebar 4 column",
  //             href: "/shop-banner-right-sidebar-col-4",
  //           },
  //           {
  //             label: "Full width 4 column",
  //             href: "/shop-banner-full-width-col-4",
  //           },
  //         ],
  //       },
  //       {
  //         label: "Columns",
  //         items: [
  //           {
  //             label: "3 column Full width",
  //             href: "/shop-full-width-col-3",
  //           },
  //           {
  //             label: "4 column Full width",
  //             href: "/shop-full-width-col-4",
  //           },
  //           {
  //             label: "5 column Full width",
  //             href: "/shop-full-width-col-5",
  //           },
  //           {
  //             label: "6 column Full width",
  //             href: "/shop-full-width-col-6",
  //           },
  //           {
  //             label: "Banner 3 column",
  //             href: "/shop-banner-full-width-col-3",
  //           },
  //         ],
  //       },
  //       {
  //         label: "List",
  //         items: [
  //           {
  //             label: "shop Left sidebar",
  //             href: "/shop-list-left-sidebar",
  //           },
  //           {
  //             label: "shop right sidebar ",
  //             href: "/shop-list-right-sidebar",
  //           },
  //           {
  //             label: "Banner left sidebar",
  //             href: "/shop-banner-left-sidebar",
  //           },
  //           {
  //             label: "Banner Right sidebar ",
  //             href: "/shop-banner-right-sidebar",
  //           },
  //           {
  //             label: "Full width 2 column",
  //             href: "/shop-list-full-col-2",
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     type: "dropdown",
  //     label: "Products",
  //     items: [
  //       {
  //         label: "Product Page",
  //         href: "",
  //         sublabel: [
  //           {
  //             label: "Product Left Sidebar",
  //             href: "/product-left-sidebar",
  //           },
  //           {
  //             label: "Product Right Sidebar",
  //             href: "/product-right-sidebar",
  //           },
  //         ],
  //       },
  //       {
  //         label: "Product According",
  //         href: "",
  //         sublabel: [
  //           {
  //             label: "Left Sidebar",
  //             href: "/product-accordion-left-sidebar",
  //           },
  //           {
  //             label: "Right Sidebar",
  //             href: "/product-accordion-right-sidebar",
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     type: "dropdown",
  //     label: "Pages",
  //     items: [
  //       {
  //         label: "About Us",
  //         href: "/about-us",
  //       },
  //       {
  //         label: "Contact Us",
  //         href: "/contact-us",
  //       },
  //       {
  //         label: "Cart",
  //         href: "/cart",
  //       },
  //       {
  //         label: "Checkout",
  //         href: "/checkout",
  //       },
  //       {
  //         label: "Compare",
  //         href: "/compare",
  //       },
  //       {
  //         label: "FAQ",
  //         href: "/faq",
  //       },
  //       {
  //         label: "Login",
  //         href: "/login",
  //       },
  //       {
  //         label: "Register",
  //         href: "/register",
  //       },
  //     ],
  //   },
  //   {
  //     type: "dropdown",
  //     label: "Blog",
  //     items: [
  //       {
  //         label: "Left sidebar",
  //         href: "/blog-left-sidebar",
  //       },
  //       {
  //         label: "Right sidebar",
  //         href: "/blog-right-sidebar",
  //       },
  //       {
  //         label: "Full width",
  //         href: "/blog-full-width",
  //       },
  //       {
  //         label: "Detail Left sidebar",
  //         href: "/blog-detail-left-sidebar",
  //       },
  //       {
  //         label: "Detail Right Sidebar",
  //         href: "/blog-detail-right-sidebar",
  //       },
  //       {
  //         label: "Detail Full width",
  //         href: "/blog-detail-full-width",
  //       },
  //     ],
  //   },
  //   {
  //     type: "link",
  //     label: "Offers",
  //     href: "/offer",
  //     icon: true,
  //   },
  // ];
  return (
    <header className="bb-header">
      <HeaderTop config={top_header} />
      <HeaderCenter
        main_menu={main_menu}
        logo={logo}
        my_account_menus={my_account_menus}
        login_menus={login_menus}
      />
      <HeaderBottom main_menu={main_menu} />
    </header>
  );
};

export default Header;
