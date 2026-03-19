"use client";

// If you have custom SVG icons (e.g., LogoIcon) export them from "@/components/Icons"
import * as CustomIcons from "./Icons";
import * as Lucide from "lucide-react";
import { ScrollToTop } from "./dynamic-components/ScrollToTop";

/* ================= Types ================= */
type BrandIcon =
  | { kind: "custom"; name: keyof typeof CustomIcons; className?: string }
  | {
      kind: "lucide";
      name: keyof typeof Lucide;
      className?: string;
      size?: number;
    }
  | {
      kind: "image";
      src: string;
      alt?: string;
      width?: number;
      height?: number;
      className?: string;
    };

type Brand = {
  text?: string; // "ShadcnUI/React"
  href?: string; // "/"
  icon?: BrandIcon; // optional icon shown before the text
  className?: string;
};

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
  className?: string;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
  className?: string;
};

type Copyright = {
  prefix?: string; // "© 2024 Landing page made by "
  author?: { label: string; href: string; external?: boolean };
  year?: number | "auto"; // default "auto"
  className?: string;
};

export type FooterSectionProps = {
  id?: string;

  brand?: Brand;
  columns: FooterColumn[];

  copyright?: Copyright;

  showTopDivider?: boolean;

  // style overrides (content-free)
  sectionClass?: string;
  gridClass?: string;
  brandWrapClass?: string;
  titleClass?: string;
  linkClass?: string;
};

/* ================= Component ================= */
export default function FooterSection({}: FooterSectionProps) {
  return (
    <>
      <footer className="bb-footer mt-[50px] max-[1199px]:mt-[35px] bg-[#f8f8fb] text-[#fff]">
        <div className="footer-directory py-[50px] max-[1199px]:py-[35px] border-[1px]  border-solid">
          <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
            <div className="flex flex-wrap w-full">
              <div
                className="w-full"
                data-aos="fade-up"
                data-aos-duration={1000}
                data-aos-delay={200}
              >
                <div className="directory-title mb-[24px] text-center">
                  <h4 className="font-quicksand leading-[1.2] text-[16px] font-bold text-[#3d4750] tracking-[0] uppercase">
                    Brands Directory
                  </h4>
                </div>
                <div className="directory-contact mb-[-24px]">
                  <div className="flex flex-wrap w-full">
                    <div className="min-[992px]:w-[50%] w-full px-[12px]">
                      <div className="inner-contact mb-[24px]">
                        <ul className="flex flex-wrap">
                          <li>
                            <span className="font-Poppins leading-[28px] tracking-[0.03rem] mr-[12px] text-[14px] font-semibold text-[#686e7d] capitalize">
                              Jewellery :
                            </span>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              Necklace
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              Earrings
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              Couple Rings
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              Pendants
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              crystal
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              Bangles
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              Bracelets
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              Nose pin
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              Chain
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              Earrings
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              Couple Rings
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="inner-contact mb-[24px]">
                        <ul className="flex flex-wrap">
                          <li>
                            <span className="font-Poppins leading-[28px] tracking-[0.03rem] mr-[12px] text-[14px] font-semibold text-[#686e7d] capitalize">
                              Footwear :
                            </span>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              Sport
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              Formal
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              Boots
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              Casual
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              Cowboy Shoes
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              Safety Shoes
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              Party Wear Shoes
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              Branded
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              First copy
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              Long Shoes
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="min-[992px]:w-[50%] w-full px-[12px]">
                      <div className="inner-contact mb-[24px]">
                        <ul className="flex flex-wrap">
                          <li>
                            <span className="font-Poppins leading-[28px] tracking-[0.03rem] mr-[12px] text-[14px] font-semibold text-[#686e7d] capitalize">
                              Fashion :
                            </span>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              T-Shirt
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              Short &amp; Jeans
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              Jacket
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              Dress &amp; Frock
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              Inner wear
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              Hosiery
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="inner-contact mb-[24px]">
                        <ul className="flex flex-wrap">
                          <li>
                            <span className="font-Poppins leading-[28px] tracking-[0.03rem] mr-[12px] text-[14px] font-semibold text-[#686e7d] capitalize">
                              Cosmetics :
                            </span>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              Shampoo
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              Body wash
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              face wash
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              Makeup kit
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              Liner
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              Lipstick
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              Perfume
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              Body Shop
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              Scrub
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              Hair Gel
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              Hair colors
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              Hair Dye
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              Sunscreen
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              Skin Lotion
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              Liner
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] text-[13px] font-normal text-[#686e7d] hover:text-[#13151a] capitalize"
                            >
                              Lipstick
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-container border-t-[1px] border-solid border-[#eee]">
          <div className="footer-top py-[50px] max-[1199px]:py-[35px]">
            <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
              <div
                className="flex flex-wrap w-full max-[991px]:mb-[-30px]"
                data-aos="fade-up"
                data-aos-duration={1000}
                data-aos-delay={200}
              >
                <div className="min-[992px]:w-[25%] max-[991px]:w-full w-full px-[12px] bb-footer-toggle bb-footer-cat">
                  <div className="bb-footer-widget bb-footer-company flex flex-col max-[991px]:mb-[24px]">
                    <img
                      src="/assets/pioneer_wholesale_inc/img/logo/logo.png"
                      className="bb-footer-logo max-w-[144px] mb-[30px] max-[767px]:max-w-[130px]"
                      alt="footer logo"
                    />
                    <img
                      src="/assets/pioneer_wholesale_inc/img/logo/logo-dark.png"
                      className="bb-footer-dark-logo max-w-[144px] mb-[30px] max-[767px]:max-w-[130px] hidden"
                      alt="footer logo"
                    />
                    <p className="bb-footer-detail max-w-[400px] mb-[30px] p-[0] font-Poppins text-[14px] leading-[27px] font-normal text-[#686e7d] inline-block relative max-[1399px]:text-[15px] max-[1199px]:text-[14px]">
                      BlueBerry is the biggest market of grocery products. Get
                      your daily needs from our store.
                    </p>
                    <div className="bb-app-store m-[-7px] flex flex-wrap">
                      <a href="javascript:void(0)" className="app-img">
                        <img
                          src="/assets/pioneer_wholesale_inc/img/app/android.png"
                          className="adroid max-w-[140px] m-[7px] rounded-[5px] max-[1399px]:max-w-[120px]"
                          alt="apple"
                        />
                      </a>
                      <a href="javascript:void(0)" className="app-img">
                        <img
                          src="/assets/pioneer_wholesale_inc/img/app/apple.png"
                          className="apple max-w-[140px] m-[7px] rounded-[5px] max-[1399px]:max-w-[120px]"
                          alt="apple"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="min-[992px]:w-[16.66%] max-[991px]:w-full w-full px-[12px] bb-footer-toggle bb-footer-info">
                  <div className="bb-footer-widget">
                    <h4 className="bb-footer-heading font-quicksand leading-[1.2] text-[18px] font-bold mb-[20px] text-[#3d4750] tracking-[0] relative block w-full pb-[15px] capitalize border-b-[1px] border-solid border-[#eee] max-[991px]:text-[14px]">
                      Category
                    </h4>
                    <div className="bb-footer-links bb-footer-dropdown hidden max-[991px]:mb-[35px]">
                      <ul className="align-items-center">
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <a
                            href="shop-left-sidebar-col-3.html"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#13151a] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Dairy &amp; Milk
                          </a>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <a
                            href="shop-banner-left-sidebar-col-3.html"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#13151a] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Snack &amp; Spice
                          </a>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <a
                            href="shop-full-width-col-5.html"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#13151a] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Fast Food
                          </a>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <a
                            href="shop-list-left-sidebar.html"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#13151a] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Juice &amp; Drinks
                          </a>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <a
                            href="shop-list-full-col-2.html"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#13151a] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Bakery
                          </a>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center">
                          <a
                            href="shop-banner-right-sidebar-col-4.html"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#13151a] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Seafood
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="min-[992px]:w-[16.66%] max-[991px]:w-full w-full px-[12px] bb-footer-toggle bb-footer-account">
                  <div className="bb-footer-widget">
                    <h4 className="bb-footer-heading font-quicksand leading-[1.2] text-[18px] font-bold mb-[20px] text-[#3d4750] tracking-[0] relative block w-full pb-[15px] capitalize border-b-[1px] border-solid border-[#eee] max-[991px]:text-[14px]">
                      Company
                    </h4>
                    <div className="bb-footer-links bb-footer-dropdown hidden max-[991px]:mb-[35px]">
                      <ul className="align-items-center">
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <a
                            href="about-us.html"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#13151a] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            About us
                          </a>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <a
                            href="track-order.html"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#13151a] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Delivery
                          </a>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <a
                            href="faq.html"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#13151a] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Legal Notice
                          </a>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <a
                            href="terms.html"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#13151a] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Terms &amp; conditions
                          </a>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <a
                            href="checkout.html"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#13151a] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Secure payment
                          </a>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center">
                          <a
                            href="contact-us.html"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#13151a] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Contact us
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="min-[992px]:w-[16.66%] max-[991px]:w-full w-full px-[12px] bb-footer-toggle bb-footer-service">
                  <div className="bb-footer-widget">
                    <h4 className="bb-footer-heading font-quicksand leading-[1.2] text-[18px] font-bold mb-[20px] text-[#3d4750] tracking-[0] relative block w-full pb-[15px] capitalize border-b-[1px] border-solid border-[#eee] max-[991px]:text-[14px]">
                      Account
                    </h4>
                    <div className="bb-footer-links bb-footer-dropdown hidden max-[991px]:mb-[35px]">
                      <ul className="align-items-center">
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <a
                            href="login.html"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#13151a] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Sign In
                          </a>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <a
                            href="cart.html"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#13151a] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            View Cart
                          </a>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <a
                            href="faq.html"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#13151a] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Return Policy
                          </a>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <a
                            href="shop-left-sidebar-col-3.html"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#13151a] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Become a Vendor
                          </a>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <a
                            href="product-left-sidebar.html"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#13151a] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Affiliate Program
                          </a>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center">
                          <a
                            href="checkout.html"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#13151a] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Payments
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="min-[992px]:w-[25%] max-[991px]:w-full w-full px-[12px] bb-footer-toggle bb-footer-cont-social">
                  <div className="bb-footer-contact mb-[30px]">
                    <div className="bb-footer-widget">
                      <h4 className="bb-footer-heading font-quicksand leading-[1.2] text-[18px] font-bold mb-[20px] text-[#3d4750] tracking-[0] relative block w-full pb-[15px] capitalize border-b-[1px] border-solid border-[#eee] max-[991px]:text-[14px]">
                        Contact
                      </h4>
                      <div className="bb-footer-links bb-footer-dropdown hidden max-[991px]:mb-[35px]">
                        <ul className="align-items-center">
                          <li className="bb-footer-link bb-foo-location flex items-start max-[991px]:mb-[15px] mb-[16px]">
                            <span className="mt-[5px] w-[25px] basis-[auto] grow-[0] shrink-[0]">
                              <i className="ri-map-pin-line leading-[0] text-[18px] text-[#13151a]" />
                            </span>
                            <p className="m-[0] font-Poppins text-[14px] text-[#686e7d] font-normal leading-[28px] tracking-[0.03rem]">
                              971 Lajamni, Motavarachha, Surat, Gujarat, Bharat
                              394101.
                            </p>
                          </li>
                          <li className="bb-footer-link bb-foo-call flex items-start max-[991px]:mb-[15px] mb-[16px]">
                            <span className="w-[25px] basis-[auto] grow-[0] shrink-[0]">
                              <i className="ri-whatsapp-line leading-[0] text-[18px] text-[#13151a]" />
                            </span>
                            <a
                              href="tel:+009876543210"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] inline-block relative break-all tracking-[0] font-normal max-[1399px]:text-[15px] max-[1199px]:text-[14px]"
                            >
                              +00 9876543210
                            </a>
                          </li>
                          <li className="bb-footer-link bb-foo-mail flex">
                            <span className="w-[25px] basis-[auto] grow-[0] shrink-[0]">
                              <i className="ri-mail-line leading-[0] text-[18px] text-[#13151a]" />
                            </span>
                            <a
                              href="mailto:example@email.com"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] inline-block relative break-all tracking-[0] font-normal max-[1399px]:text-[15px] max-[1199px]:text-[14px]"
                            >
                              example@email.com
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="bb-footer-social">
                    <div className="bb-footer-widget">
                      <div className="bb-footer-links bb-footer-dropdown hidden max-[991px]:mb-[35px]">
                        <ul className="align-items-center flex flex-wrap items-center">
                          <li className="bb-footer-link leading-[1.5] flex items-center pr-[5px]">
                            <a
                              href="javascript:void(0)"
                              className="transition-all duration-[0.3s] ease-in-out w-[30px] h-[30px] rounded-[5px] bg-[#3d4750] hover:bg-[#13151a] capitalize flex items-center justify-center text-[15px] leading-[20px] text-[#686e7d] relative break-all font-normal"
                            >
                              <i className="ri-facebook-fill text-[16px] text-[#fff]" />
                            </a>
                          </li>
                          <li className="bb-footer-link leading-[1.5] flex items-center pr-[5px]">
                            <a
                              href="javascript:void(0)"
                              className="transition-all duration-[0.3s] ease-in-out w-[30px] h-[30px] rounded-[5px] bg-[#3d4750] hover:bg-[#13151a] capitalize flex items-center justify-center text-[15px] leading-[20px] text-[#686e7d] relative break-all font-normal"
                            >
                              <i className="ri-twitter-fill text-[16px] text-[#fff]" />
                            </a>
                          </li>
                          <li className="bb-footer-link leading-[1.5] flex items-center pr-[5px]">
                            <a
                              href="javascript:void(0)"
                              className="transition-all duration-[0.3s] ease-in-out w-[30px] h-[30px] rounded-[5px] bg-[#3d4750] hover:bg-[#13151a] capitalize flex items-center justify-center text-[15px] leading-[20px] text-[#686e7d] relative break-all font-normal"
                            >
                              <i className="ri-linkedin-fill text-[16px] text-[#fff]" />
                            </a>
                          </li>
                          <li className="bb-footer-link leading-[1.5] flex items-center pr-[5px]">
                            <a
                              href="javascript:void(0)"
                              className="transition-all duration-[0.3s] ease-in-out w-[30px] h-[30px] rounded-[5px] bg-[#3d4750] hover:bg-[#13151a] capitalize flex items-center justify-center text-[15px] leading-[20px] text-[#686e7d] relative break-all font-normal"
                            >
                              <i className="ri-instagram-line text-[16px] text-[#fff]" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom py-[10px] border-t-[1px] border-solid border-[#eee] max-[991px]:py-[15px]">
            <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
              <div className="flex flex-wrap w-full">
                <div className="bb-bottom-info w-full flex flex-row items-center justify-between max-[991px]:flex-col px-[12px]">
                  <div className="footer-copy max-[991px]:mb-[15px]">
                    <div className="footer-bottom-copy max-[991px]:text-center">
                      <div className="bb-copy text-[#686e7d] text-[13px] tracking-[1px] text-center font-normal leading-[2]">
                        Copyright ©
                        <span
                          className="text-[#686e7d] text-[13px] tracking-[1px] text-center font-normal"
                          id="copyright_year"
                        />
                        <a
                          className="site-name pr-1 pl-1 transition-all duration-[0.3s] ease-in-out font-medium text-[#13151a] hover:text-[#3d4750] font-Poppins text-[15px] leading-[28px] tracking-[0.03rem]"
                          href="#"
                        >
                          Pioneer wholesale inc
                        </a>
                        all rights reserved.
                      </div>
                    </div>
                  </div>
                  <div className="footer-bottom-right">
                    <div className="footer-bottom-payment flex justify-center">
                      <div className="payment-link">
                        <img
                          src="/assets/pioneer_wholesale_inc/img/payment/payment.png"
                          alt="payment"
                          className="max-[360px]:w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <ScrollToTop />
    </>
  );
}
