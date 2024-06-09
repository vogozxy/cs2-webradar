"use client";

import React, { useEffect, useState, useContext } from "react";
import { useLocalStorage } from "usehooks-ts";

import { Settings } from "@/types/settings";

import { DEFAULT_SETTINGS } from "@/constants/settings";

import { SettingsContext } from "@/contexts/settings";

export const SettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const settingsCtx = useContext(SettingsContext);

  const [radarTheme, setRadarTheme] = useLocalStorage<"default" | "classic">(
    "radar_theme",
    settingsCtx.radarTheme
  );
  const [darkMode, setDarkMode] = useLocalStorage<boolean>(
    "dark_mode",
    settingsCtx.darkMode
  );
  const [showSettings, setShowSettings] = useState<boolean>(
    settingsCtx.showSettings
  );
  const [settings, setSettings] = useLocalStorage<Settings>(
    "settings",
    settingsCtx.settings
  );

  const toggleRadarTheme = () => {
    setRadarTheme(radarTheme === "default" ? "classic" : "default");
  };

  useEffect(() => {
    const getRadarThemePreference = () => {
      const radarThemePreference =
        window.localStorage.getItem("radar_theme")?.replace(/"/g, "") ??
        settingsCtx.radarTheme;

      const radarTheme =
        radarThemePreference === "default" || radarThemePreference === "classic"
          ? radarThemePreference
          : settingsCtx.radarTheme;

      return radarTheme;
    };

    setRadarTheme(getRadarThemePreference());
  }, [radarTheme, setRadarTheme, settingsCtx.radarTheme]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const getDarkModePreference = () => {
      const darkMode = window.localStorage.getItem("dark_mode");
      const isDarkMode =
        darkMode === "true" || darkMode === "false"
          ? JSON.parse(darkMode)
          : window.matchMedia("(prefers-color-scheme: dark)").matches;

      return isDarkMode;
    };

    setDarkMode(getDarkModePreference());

    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode, setDarkMode]);

  const showSettingsMenu = (show: boolean) => {
    setShowSettings(show);
  };

  const updateSettings = (settings: Settings) => {
    setSettings(settings);
  };

  const getSettingsPreference = () => {
    return JSON.parse(
      window.localStorage.getItem("settings") ??
        JSON.stringify(DEFAULT_SETTINGS)
    );
  };

  useEffect(() => {
    setSettings(getSettingsPreference());
  }, [setSettings]);

  return (
    <SettingsContext.Provider
      value={{
        radarTheme,
        darkMode,
        showSettings,
        settings,
        toggleRadarTheme,
        toggleDarkMode,
        showSettingsMenu,
        updateSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
