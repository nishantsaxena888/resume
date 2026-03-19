export type SimpleLink = { label: string; href?: string; external?: boolean };

export type Dropdown = {
  label: string; // e.g., "Language"
  items: SimpleLink[]; // options inside the dropdown
  selectedIndex?: number; // optional: which is currently selected
};

export type HeaderTopConfig = {
  announcement: SimpleLink; // left bar message/link
  right: {
    links: SimpleLink[]; // right side simple links
    dropdowns: Dropdown[]; // right side dropdowns (Language/Currency/etc)
  };
};
