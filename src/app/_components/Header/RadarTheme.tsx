import { useEffect, useRef, useContext } from "react";

import { SettingsContext } from "@/contexts/settings";

export default function RadarTheme() {
  const radarThemeRef = useRef<HTMLDivElement>(null);

  const settingsCtx = useContext(SettingsContext);

  const handleRadarTheme = () => {
    settingsCtx.toggleRadarTheme();
    radarThemeRef.current?.setAttribute(
      "data-radar-theme",
      settingsCtx.radarTheme
    );
  };

  useEffect(() => {
    radarThemeRef.current?.setAttribute(
      "data-radar-theme",
      settingsCtx.radarTheme
    );
  }, [settingsCtx.radarTheme]);

  return (
    <button
      onClick={handleRadarTheme}
      className="h-10 w-10 overflow-hidden rounded-lg bg-black/5 p-2 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10"
    >
      <div
        ref={radarThemeRef}
        className="transform transition duration-200 ease-in-out data-radar-theme-default:translate-y-0 data-radar-theme-classic:-translate-y-8"
      >
        <svg className="mb-2 h-6 w-6" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 24C8.8174 24 5.76516 22.7357 3.51472 20.4853C1.26428 18.2348 2.40279e-07 15.1826 0 12C-2.40279e-07 8.8174 1.26428 5.76516 3.51472 3.51472C5.76515 1.26428 8.8174 4.80559e-07 12 0L12 12L12 24Z"
            fill="#DF7D29"
          />
          <path
            d="M12 0C15.1826 0 18.2348 1.26428 20.4853 3.51472C22.7357 5.76515 24 8.8174 24 12C24 15.1826 22.7357 18.2348 20.4853 20.4853C18.2348 22.7357 15.1826 24 12 24L12 12V0Z"
            fill="#84C8ED"
          />
        </svg>
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 24C8.8174 24 5.76516 22.7357 3.51472 20.4853C1.26428 18.2348 2.40279e-07 15.1826 0 12C-2.40279e-07 8.8174 1.26428 5.76516 3.51472 3.51472C5.76515 1.26428 8.8174 4.80559e-07 12 0L12 12L12 24Z"
            fill="#FF0000"
          />
          <path
            d="M12 0C15.1826 0 18.2348 1.26428 20.4853 3.51472C22.7357 5.76515 24 8.8174 24 12C24 15.1826 22.7357 18.2348 20.4853 20.4853C18.2348 22.7357 15.1826 24 12 24L12 12V0Z"
            fill="#00FF00"
          />
        </svg>
      </div>
    </button>
  );
}
