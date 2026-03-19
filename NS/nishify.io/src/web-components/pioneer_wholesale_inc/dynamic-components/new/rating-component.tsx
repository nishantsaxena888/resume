import React from "react";

type RatingProps = {
  value: number; // current rating (0–5)
  max?: number; // total stars (default 5)
};

export const Rating: React.FC<RatingProps> = ({ value, max = 5 }) => {
  return (
    <span className="bb-pro-rating flex">
      {Array.from({ length: max }, (_, i) => {
        const filled = i < value;
        return (
          <i
            key={i}
            className={`ri-star-${
              filled ? "fill" : "line"
            } text-[15px] mr-[3px] leading-[18px] ${
              filled ? "text-[#fea99a]" : "text-[#777]"
            }`}
          />
        );
      })}
    </span>
  );
};
