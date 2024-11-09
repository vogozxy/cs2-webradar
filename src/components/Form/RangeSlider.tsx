import React from "react";

export default function RangeSlider({
  id,
  onChange,
  className,
  min = 0,
  max = 50,
  defaultValue,
  value,
  step = 1,
  stepLabel = false,
}: {
  id?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  min?: number;
  max?: number;
  defaultValue?: number;
  value?: number;
  step?: number;
  stepLabel?: boolean;
}) {
  if (typeof value === "undefined" && typeof defaultValue === "undefined") {
    defaultValue = min;
  }

  return (
    <>
      <input
        id={id}
        type="range"
        onChange={onChange}
        className={className}
        min={min}
        max={max}
        value={value}
        defaultValue={defaultValue}
        step={step}
      />
      {stepLabel && (
        <div className="flex items-center justify-between px-2 text-center">
          <span className="w-0 -translate-x-1 text-xs">{min}</span>
          {[...Array(max - min - 1)].map((_, i) => (
            <span key={i} className="text-xs">
              {min + i + 1}
            </span>
          ))}
          <span className="w-0 -translate-x-2 text-xs">{max}</span>
        </div>
      )}
    </>
  );
}
