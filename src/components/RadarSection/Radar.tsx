import React, { useEffect, useRef } from "react";

type RadarProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

export default function Radar({ id, className, children }: RadarProps) {
  const radarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const radar = radarRef.current;

    const handleResize = () => {
      radar?.classList.add("opacity-0");
      radar?.classList.add("h-0");
      radar?.classList.add("w-0");
      clearTimeout(timer);
      timer = setTimeout(run, 300);
    };

    const run = () => {
      radar?.classList.remove("opacity-0");
      radar?.classList.remove("h-0");
      radar?.classList.remove("w-0");
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div id={id} ref={radarRef} className={className}>
      {children}
    </div>
  );
}
