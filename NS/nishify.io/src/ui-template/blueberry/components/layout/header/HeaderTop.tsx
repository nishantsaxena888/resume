"use client";

import Link from "next/link";
import React from "react";
import { Row } from "react-bootstrap";
import { HeaderTopConfig } from "./headerTop.config";

function LinkOrSpan({
  children,
  href,
  className,
  external,
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
  external?: boolean;
}) {
  if (!href) return <span className={className}>{children}</span>;
  if (external)
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          // keep as-is or customize
        }}
      >
        {children}
      </a>
    );
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

type Props = {
  config: HeaderTopConfig;
};

const HeaderTop: React.FC<Props> = ({ config }) => {
  return (
    <div className="top-header">
      <div className="container">
        <Row>
          <div className="col-12">
            <div className="inner-top-header">
              {/* Left announcement */}
              <div className="col-left-bar">
                <LinkOrSpan href={config?.announcement.href}>
                  {config?.announcement.label}
                </LinkOrSpan>
              </div>

              {/* Right links + dropdowns */}
              <div className="col-right-bar">
                {/* Simple links */}
                {config?.right.links.map((l, i) => (
                  <div className="cols" key={`rl-${i}`}>
                    <LinkOrSpan href={l.href} external={l.external}>
                      {l.label}
                    </LinkOrSpan>
                  </div>
                ))}

                {/* Dropdowns */}
                {config?.right.dropdowns.map((dd, i) => (
                  <div className="cols" key={`dd-${dd.label}-${i}`}>
                    <div className="custom-dropdown">
                      {/* Toggle label (could reflect selected item) */}
                      <LinkOrSpan href="#" className="bb-dropdown-toggle">
                        {dd.label}
                        {typeof dd.selectedIndex === "number" &&
                          dd.items[dd.selectedIndex] && (
                            <span className="ml-1 text-muted-foreground">
                              ({dd.items[dd.selectedIndex].label})
                            </span>
                          )}
                      </LinkOrSpan>

                      <ul className="dropdown">
                        {dd.items.map((opt, j) => (
                          <li key={`dd-item-${i}-${j}`}>
                            <LinkOrSpan href={opt.href} external={opt.external}>
                              {opt.label}
                            </LinkOrSpan>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Row>
      </div>
    </div>
  );
};

export default HeaderTop;
