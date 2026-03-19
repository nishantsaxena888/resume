import Link from "next/link";
import React from "react";
type Itemtype = {
  type: string;
  icon: string;
  text: string;
  href: string;
};
type FooterContactProps = {
  list: Itemtype[];
};
export const FooterContact = ({ list }: FooterContactProps) => {
  return (
    <ul className="align-items-center">
      {list.map((item, idx) => (
        <li key={idx} className={`bb-footer-link bb-foo-${item.type}`}>
          <span className="mr-2">
            <i className={item.icon}></i>
          </span>
          {item.href ? (
            <Link href={item.href}>{item.text}</Link>
          ) : (
            <p>{item.text}</p>
          )}
        </li>
      ))}
    </ul>
  );
};
