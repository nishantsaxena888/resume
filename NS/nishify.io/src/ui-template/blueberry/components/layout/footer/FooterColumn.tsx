import Link from "next/link";

type LinksType = {
  href: string;
  label: string;
};
type FooterLinksProps = {
  list: Array<LinksType>;
};

export default function FooterColumn({ list }: FooterLinksProps) {
  return (
    <ul className="align-items-center">
      {list.map((link) => (
        <li key={link.href} className="bb-footer-link">
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
}
