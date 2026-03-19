"use client";

import { Slider, SliderThumb } from "@/components/ui/slider";

export default function MultiRangeSlider({
  min = 0,
  max = 600,
  step,
  value = [100, 450],
  default_value,
  onChange,
  currency = "$",
}: any) {
  return (
    <div className="space-y-4">
      <div className=" text-center text-black dark:text-white bg-white border rounded-sm px-4 py-2">
        {currency}
        {value?.[0]} - {currency}
        {value?.[1]}
      </div>
      <Slider
        defaultValue={default_value}
        value={value || [0, 0]}
        onValueChange={onChange}
        min={min}
        max={max}
        step={step}
      >
        <SliderThumb />
        <SliderThumb />
      </Slider>
    </div>
  );
}
