"use client";

import * as React from "react";

export default function ZoomImage() {
  const [backgroundPosition, setBackgroundPosition] = React.useState("center");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="w-[300px] h-[200px] bg-no-repeat bg-cover border rounded-lg overflow-hidden"
      style={{
        backgroundImage: `url(/assets/img/hero/hero-3.png)`,
        backgroundPosition,
        backgroundSize: "200%", // zoom level
      }}
    />
  );
}
