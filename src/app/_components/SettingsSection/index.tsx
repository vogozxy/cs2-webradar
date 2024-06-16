import React, { useContext, useState, useEffect } from "react";
import Select from "react-select";

import { PrimaryWeapon } from "@/types/weapon";

import { DEFAULT_PLAYER_SETTINGS } from "@/constants/settings";

import { SettingsContext } from "@/contexts/settings";

import RangeSlider from "@/components/Form/RangeSlider";

type SelectOption = {
  value: string;
  label: string;
};

const importantWeaponsOptions: SelectOption[] = Object.entries(PrimaryWeapon)
  .filter(([_key, value]) => typeof value === "number")
  .map(([key, value]) => ({ value: `${value}`, label: key }));

const getImportantWeaponsValue = (
  importantWeapons: number[]
): SelectOption[] => {
  return importantWeapons.map((value) => ({
    value: `${value}`,
    label: PrimaryWeapon[value],
  }));
};

export default function SettingsSection() {
  const settingsCtx = useContext(SettingsContext);

  const [isMounted, setIsMounted] = useState<boolean>(false);

  const [playerDotSize, setPlayerDotSize] = useState<number>(
    settingsCtx.settings.player.dotSize
  );

  const [playerViewAngleLength, setPlayerViewAngleLength] = useState<number>(
    settingsCtx.settings.player.viewAngleLength
  );

  const [playerImportantWeapons, setPlayerImportantWeapons] = useState<
    number[]
  >(settingsCtx.settings.player.importantWeapons);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handlePlayerDotSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dotSize =
      parseInt((event.target as HTMLInputElement).value) ||
      settingsCtx.settings.player.dotSize;

    setPlayerDotSize(dotSize);
  };

  const handlePlayerViewAngleLength = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const viewAngleLength =
      parseInt((event.target as HTMLInputElement).value) ||
      settingsCtx.settings.player.viewAngleLength;

    setPlayerViewAngleLength(viewAngleLength);
  };

  const handlePlayerImportantWeapons = (option: readonly SelectOption[]) => {
    const importantWeapons: number[] = option
      .map(({ value }) => parseInt(value))
      .filter((num) => !isNaN(num));

    setPlayerImportantWeapons(importantWeapons);
  };

  const handleSave = () => {
    settingsCtx.updateSettings({
      ...settingsCtx.settings,
      player: {
        ...settingsCtx.settings.player,
        dotSize: playerDotSize,
        viewAngleLength: playerViewAngleLength,
        importantWeapons: playerImportantWeapons,
      },
    });
  };

  const handleRestoreDefaults = () => {
    setPlayerDotSize(DEFAULT_PLAYER_SETTINGS.dotSize);
    setPlayerViewAngleLength(DEFAULT_PLAYER_SETTINGS.viewAngleLength);
    setPlayerImportantWeapons(DEFAULT_PLAYER_SETTINGS.importantWeapons);
  };

  const handleClose = () => {
    settingsCtx.showSettingsMenu(false);
    setPlayerDotSize(settingsCtx.settings.player.dotSize);
    setPlayerViewAngleLength(settingsCtx.settings.player.viewAngleLength);
    setPlayerImportantWeapons(settingsCtx.settings.player.importantWeapons);
  };

  return (
    <div
      className={`${!settingsCtx.showSettings ? "hidden" : ""} fixed left-0 right-0 top-0 z-10 flex h-full max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50 md:inset-0`}
    >
      <div className="relative max-h-full w-full max-w-lg p-4">
        {/* Modal content */}
        <div className="relative rounded-lg bg-white shadow dark:bg-zinc-800">
          {/* Modal header */}
          <div className="flex items-center justify-between rounded-t border-b p-4 md:p-5 dark:border-gray-600">
            <h3 className="text-lg font-medium">Radar Settings</h3>
            <button
              type="button"
              onClick={handleClose}
              className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm hover:bg-black/10 dark:hover:bg-white/10"
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 14 14">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>

          {/* Modal body */}
          <div className="p-4 md:p-5">
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="settings-player-dot-size"
                  className="mb-2 block text-sm font-medium"
                >
                  Player Dot Size
                </label>
                <RangeSlider
                  id="settings-player-dot-size"
                  onChange={handlePlayerDotSize}
                  className="mb-1 mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 focus:outline-blue-700 dark:bg-gray-700"
                  min={6}
                  max={10}
                  value={playerDotSize}
                  stepLabel
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="settings-view-angle-length"
                  className="mb-2 block text-sm font-medium"
                >
                  View Angle Length
                </label>
                <RangeSlider
                  id="settings-view-angle-length"
                  onChange={handlePlayerViewAngleLength}
                  className="mb-1 mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 focus:outline-blue-700 dark:bg-gray-700"
                  min={20}
                  max={25}
                  value={playerViewAngleLength}
                  stepLabel
                />
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="settings-important-weapons"
                  className="mb-2 block text-sm font-medium"
                >
                  Important Weapons
                </label>
                {isMounted && (
                  <Select
                    id="settings-important-weapons"
                    onChange={handlePlayerImportantWeapons}
                    defaultValue={getImportantWeaponsValue(
                      playerImportantWeapons
                    )}
                    value={getImportantWeaponsValue(playerImportantWeapons)}
                    isMulti
                    options={importantWeaponsOptions}
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                )}
              </div>
            </div>

            <div className="flex flex-col justify-between sm:flex-row">
              <button
                type="button"
                onClick={handleRestoreDefaults}
                className="mt-2 inline-flex items-center justify-center rounded-lg border-2 border-zinc-300 px-5 py-2.5 text-center text-sm font-medium hover:bg-zinc-300 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:border-zinc-600 dark:hover:bg-zinc-600 dark:focus:ring-zinc-500"
              >
                Restore Defaults
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="mt-2 inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
