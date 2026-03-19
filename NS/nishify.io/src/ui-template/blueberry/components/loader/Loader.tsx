"use client";
import { useState } from "react";

const Loader = () => {
  const [showLoader] = useState(true);

  return (
    <>
      {showLoader && (
        <div className="bb-loader">
          <img
            src="/assets/blueberry/img/logo/loader.png"
            className="w-[60px]"
            alt="loader"
          />
          <span className="loader"></span>
        </div>
      )}
    </>
  );
};

export default Loader;
