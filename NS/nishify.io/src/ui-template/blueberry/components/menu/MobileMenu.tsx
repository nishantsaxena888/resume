import Link from "next/link";
import React, { Fragment, useState } from "react";
import Collapse from "react-bootstrap/Collapse";

const MenuLoop = ({ list }: any) => {
  return (
    <ul>
      {list?.map((data: any, index: number) => {
        return (
          <Fragment key={index}>
            <li>
              {data?.groups?.length > 0 ? (
                <MenuAccordion label={data.label}>
                  <MenuLoop list={data.groups} />
                </MenuAccordion>
              ) : data?.items?.length > 0 ? (
                <MenuAccordion label={data.label}>
                  <MenuLoop list={data.items} />
                </MenuAccordion>
              ) : (
                <Link key={index} href={data.href || ""}>
                  {data.label}
                </Link>
              )}
            </li>
          </Fragment>
        );
      })}
    </ul>
  );
};

const MenuAccordion = ({ label, children }: any) => {
  const [activeSubMenu, setActiveSubMenu] = useState<boolean>(false);
  return (
    <>
      <Link onClick={() => setActiveSubMenu(() => !activeSubMenu)} href="">
        {label}
      </Link>
      <span
        onClick={() => setActiveSubMenu(() => !activeSubMenu)}
        className="menu-toggle"
      ></span>
      <Collapse in={activeSubMenu}>
        <ul
          style={{
            display: activeSubMenu ? "block" : "none",
          }}
          className="sub-menu height-transition-1s-ease"
        >
          {children}
        </ul>
      </Collapse>
    </>
  );
};

const MobileMenu = ({ isMobileMenuOpen, closeMobileManu, main_menu }: any) => {
  return (
    <>
      <div
        style={{ display: isMobileMenuOpen ? "block" : "none" }}
        onClick={closeMobileManu}
        className="bb-mobile-menu-overlay"
      ></div>
      <div
        id="bb-mobile-menu"
        className={`bb-mobile-menu ${isMobileMenuOpen ? "bb-menu-open" : ""}`}
      >
        <div className="bb-menu-title">
          <span className="menu_title">My Menu</span>
          <button
            onClick={closeMobileManu}
            type="button"
            className="bb-close-menu"
          >
            ×
          </button>
        </div>
        <div className="bb-menu-inner">
          <div className="bb-menu-content">
            <MenuLoop list={main_menu} />
          </div>
          <div className="header-res-lan-curr hidden">
            {/* <!-- Social Start --> */}
            <div className="header-res-social">
              <div className="header-top-social">
                <ul className="mb-0">
                  <li className="list-inline-item">
                    <Link href="#">
                      <i className="ri-facebook-fill"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link href="#">
                      <i className="ri-twitter-fill"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link href="#">
                      <i className="ri-instagram-line"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link href="#">
                      <i className="ri-linkedin-fill"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* <!-- Social End --> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
