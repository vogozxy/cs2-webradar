"use client";

import { createContext } from "react";

import { Settings } from "@/types/settings";

import { DEFAULT_SETTINGS } from "@/constants/settings";

interface IContext {
  radarTheme: "default" | "classic";
  darkMode: boolean;
  showSettings: boolean;
  settings: Settings;
  toggleRadarTheme: () => void;
  toggleDarkMode: () => void;
  showSettingsMenu: (show: boolean) => void;
  updateSettings: (settings: Settings) => void;
}

export const SettingsContext = createContext<IContext>({
  radarTheme: "default",
  darkMode: false,
  showSettings: false,
  settings: DEFAULT_SETTINGS,
  toggleRadarTheme: () => null,
  toggleDarkMode: () => null,
  showSettingsMenu: () => null,
  updateSettings: () => null,
});
