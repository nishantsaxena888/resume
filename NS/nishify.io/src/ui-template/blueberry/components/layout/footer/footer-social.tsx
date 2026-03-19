import React from "react";

type ListType = {
  icon: string;
  href: string;
};
type FooterContactProps = {
  list: ListType[];
};

export const FooterSocial = ({ list }: FooterContactProps) => {
  return (
    <div className="bb-footer-social mt-3">
      <div className="bb-footer-widget">
        <div className="bb-footer-links bb-footer-dropdown">
          <ul className="align-items-center">
            {list.map((social, idx) => (
              <li key={idx} className="bb-footer-link">
                <a href={social.href} onClick={(e) => e.preventDefault()}>
                  <i className={social.icon}></i>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
