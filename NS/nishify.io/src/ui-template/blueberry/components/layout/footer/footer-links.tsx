import Link from "next/link";
type LinksType = {
  href: string;
  label: string;
};
type FooterLinksProps = {
  title: string;
  list: Array<LinksType>;
};

export default function FooterLinks({ list, title }: FooterLinksProps) {
  return (
    <div className="inner-contact">
      <ul>
        <li>
          <span>{title} :</span>
        </li>
        {list?.map((link, index: number) => (
          <li key={index}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
