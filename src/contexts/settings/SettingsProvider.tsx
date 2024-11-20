"use client";

import React, { useEffect, useState, useCallback } from "react";

import { Settings } from "@/types/settings";

import { DEFAULT_SETTINGS } from "@/constants/settings";

import { SettingsContext } from "@/contexts/settings";

import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { useSettingsContext } from "@/lib/hooks/use-settings-context";

import { mergeDefaultSettings } from "@/lib/settings";

export const SettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const settingsCtx = useSettingsContext();

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
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const toggleRadarTheme = useCallback(() => {
    setRadarTheme((radarTheme) =>
      radarTheme === "default" ? "classic" : "default"
    );
  }, [setRadarTheme]);

  const getRadarThemePreference = useCallback(() => {
    const radarThemePreference =
      window.localStorage.getItem("radar_theme")?.replace(/"/g, "") ??
      settingsCtx.radarTheme;

    return radarThemePreference === "default" ||
      radarThemePreference === "classic"
      ? radarThemePreference
      : settingsCtx.radarTheme;
  }, [settingsCtx.radarTheme]);

  useEffect(() => {
    setRadarTheme(getRadarThemePreference());
  }, [setRadarTheme, getRadarThemePreference]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(!darkMode);
  }, [darkMode, setDarkMode]);

  const getDarkModePreference = useCallback(() => {
    const darkModePreference = window.localStorage.getItem("dark_mode");

    return darkModePreference === "true" || darkModePreference === "false"
      ? JSON.parse(darkModePreference)
      : isDarkMode;
  }, [isDarkMode]);

  useEffect(() => {
    setDarkMode(getDarkModePreference());

    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode, setDarkMode, getDarkModePreference]);

  const showSettingsMenu = useCallback((show: boolean) => {
    setShowSettings(show);
  }, []);

  const updateSettings = useCallback(
    (settings: Settings) => {
      setSettings(settings);
    },
    [setSettings]
  );

  const getSettingsPreference = useCallback(() => {
    try {
      const settingsPreference =
        window.localStorage.getItem("settings") ??
        JSON.stringify(DEFAULT_SETTINGS);

      const parsedUserSettings: Partial<Settings> =
        JSON.parse(settingsPreference);

      const mergedSettings = mergeDefaultSettings(
        DEFAULT_SETTINGS,
        parsedUserSettings
      );

      return mergedSettings;
    } catch (error) {
      console.warn("Failed to get settings preference:", error);
      return DEFAULT_SETTINGS;
    }
  }, []);

  useEffect(() => {
    setSettings(getSettingsPreference());
  }, [setSettings, getSettingsPreference]);

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
