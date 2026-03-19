"use client";

import React from "react";
import Link from "next/link";

const Navbar = ({ main_menu }: any) => {
  return (
    <ul className="navbar-nav">
      {main_menu.map((menu: any, i: any) => {
        if (menu.type === "link") {
          return (
            <li key={i} className="nav-item">
              <Link className="nav-link" href={menu.href || ""}>
                {menu.icon ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    x="0"
                    y="0"
                    viewBox="0 0 64 64"
                    width="16"
                    height="16"
                    className="inline-block mr-1"
                  >
                    <g>
                      <path
                        d="M10 16v22c0 .3.1.6.2.8.3.6 6.5 13.8 21 20h.2c.2 0 .3.1.5.1s.3 0 .5-.1h.2c14.5-6.2 20.8-19.4 21-20 .1-.3.2-.5.2-.8V16c0-.9-.6-1.7-1.5-1.9-7.6-1.9-19.3-9.6-19.4-9.7-.1-.1-.2-.1-.4-.2-.1 0-.1 0-.2-.1h-.9c-.1 0-.2.1-.3.1-.1.1-.2.1-.4.2s-11.8 7.8-19.4 9.7c-.7.2-1.3 1-1.3 1.9zm4 1.5c6.7-2.1 15-7.2 18-9.1 3 1.9 11.3 7 18 9.1v20c-1.1 2.1-6.7 12.1-18 17.3-11.3-5.2-16.9-15.2-18-17.3z"
                        fill="#000000"
                      />
                      <path
                        d="M28.6 38.4c.4.4.9.6 1.4.6s1-.2 1.4-.6l9.9-9.9c.8-.8.8-2 0-2.8s-2-.8-2.8 0L30 34.2l-4.5-4.5c-.8-.8-2-.8-2.8 0s-.8 2 0 2.8z"
                        fill="#000000"
                      />
                    </g>
                  </svg>
                ) : null}
                {menu.label}
              </Link>
            </li>
          );
        }

        if (menu.type === "mega") {
          return (
            <li key={i} className="nav-item bb-main-dropdown">
              <Link className="nav-link bb-dropdown-item" href="#">
                {menu.label}
              </Link>
              <ul className="mega-menu">
                <li>
                  {menu?.groups?.map((group: any, g: any) => (
                    <ul key={g} className="mega-block">
                      <li className="menu_title">
                        <Link href="#">{group.label}</Link>
                      </li>
                      {group.items.map((item: any, idx: any) => (
                        <li key={idx}>
                          <Link href={item.href}>{item.label}</Link>
                        </li>
                      ))}
                    </ul>
                  ))}
                </li>
              </ul>
            </li>
          );
        }

        if (menu.type === "dropdown") {
          return (
            <li key={i} className="nav-item bb-dropdown">
              <Link className="nav-link bb-dropdown-item" href="#">
                {menu.label}
              </Link>
              <ul className="bb-dropdown-menu">
                {menu?.items?.map((item: any, idx: number) =>
                  item.subname ? (
                    <li key={idx} className="bb-mega-dropdown">
                      <Link className="bb-mega-item" href="#">
                        {item.label}
                      </Link>
                      <ul className="bb-mega-menu">
                        {item.subname.map((sub: any, sIdx: number) => (
                          <li key={sIdx}>
                            <Link href={sub.href}>{sub.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : (
                    <li key={idx}>
                      <Link href={item.href}>{item.label}</Link>
                    </li>
                  )
                )}
              </ul>
            </li>
          );
        }

        return null;
      })}
    </ul>
  );
};

export default Navbar;
