import React from "react";
type StoreType = {
  href: string;
  img: string;
  alt: string;
  className: string;
};
type Props = {
  logo: {
    light: string;
    dark: string;
    alt: string;
  };
  description: string;
  appStores: StoreType[];
};

export const FooterAbout = ({ logo, description, appStores }: Props) => {
  return (
    <div className="bb-footer-widget bb-footer-company">
      {/* Logos */}
      <img src={logo.light} className="bb-footer-logo" alt={logo.alt} />
      <img src={logo.dark} className="bb-footer-dark-logo" alt={logo.alt} />

      {/* Description */}
      <p className="bb-footer-detail">{description}</p>

      {/* App Store Links */}
      <div className="bb-app-store">
        {appStores.map((store, idx) => (
          <a
            key={idx}
            href={store.href}
            onClick={(e) => e.preventDefault()}
            className="app-img"
          >
            <img src={store.img} className={store.className} alt={store.alt} />
          </a>
        ))}
      </div>
    </div>
  );
};
