import Link from "next/link";

type LinksType = {
  label: string;
  href: string;
};
type FooterCopyrightProps = {
  year?: number;
  links: LinksType[];
};

export function FooterCopyright({ links, year }: FooterCopyrightProps) {
  return (
    <p className="text-sm text-muted-foreground flex flex-wrap gap-1">
      Copyright © <span>{year || new Date().getFullYear()}</span>
      {links.map((link, idx) => (
        <span key={idx}>
          {link.href ? (
            <Link className="site-name" href={link.href}>
              {link.label}
            </Link>
          ) : (
            <span>{link.label}</span>
          )}
          {idx < links.length - 1 && ","}{" "}
        </span>
      ))}
    </p>
  );
}
