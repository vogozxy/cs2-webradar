import React, { memo } from "react";

type RangeSliderProps = {
  stepLabel?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

function RangeSlider({
  min = 0,
  max = 50,
  value,
  defaultValue,
  step = 1,
  stepLabel = false,
  ...props
}: RangeSliderProps) {
  if (typeof value === "undefined" && typeof defaultValue === "undefined") {
    defaultValue = min;
  }

  return (
    <>
      <input
        type="range"
        min={min}
        max={max}
        defaultValue={defaultValue}
        value={value}
        step={step}
        {...props}
      />
      {stepLabel && (
        <div className="flex items-center justify-between px-2 text-center">
          <span className="w-0 -translate-x-1 text-xs">{min}</span>
          {[...Array(+max - +min - 1)].map((_, i) => (
            <span key={i} className="text-xs">
              {+min + i + 1}
            </span>
          ))}
          <span className="w-0 -translate-x-2 text-xs">{max}</span>
        </div>
      )}
    </>
  );
}

export default memo(RangeSlider);
