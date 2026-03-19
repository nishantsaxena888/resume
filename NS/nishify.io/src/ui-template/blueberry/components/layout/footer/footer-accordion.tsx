import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";

export const FooterAccordion = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [dropdownState, setDropdownState] = useState<boolean>(true);

  return (
    <div className="bb-footer-widget">
      <h4
        onClick={() => setDropdownState((prev) => !prev)}
        className="bb-footer-heading"
      >
        {title}
        <div className="bb-heading-res">
          <i className="ri-arrow-down-s-line"></i>
        </div>
      </h4>
      <motion.div
        className={`bb-footer-links bb-footer-dropdown`}
        initial={{ height: 0, opacity: 0, translateY: -20 }}
        animate={{
          height: dropdownState ? "auto" : 0,
          opacity: dropdownState ? 1 : 0,
          translateY: dropdownState ? 0 : -20,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{
          overflow: "hidden",
          display: "block",
          paddingBottom: dropdownState ? "20px" : "0px",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
