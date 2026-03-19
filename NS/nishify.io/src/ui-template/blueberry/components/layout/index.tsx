"use client";

import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Loader from "../loader/Loader";
import Toastify from "../toast-popup/Toastify";
import { usePathname } from "next/navigation";

const Layout = ({ children, data }: any) => {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500); // Adjust timeout as needed

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <>
      <Toastify />
      {data?.none_header_page?.includes(pathname) ? null : (
        <Header {...data.header} />
      )}
      {/* <Header {...data.header} /> */}
      {loading && <Loader />}
      {children}
      {data?.none_footer_page?.includes(pathname) ? null : (
        <Footer {...data.footer} />
      )}
    </>
  );
};

export default Layout;
