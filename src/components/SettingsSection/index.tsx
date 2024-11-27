import React, { useCallback, useState, useEffect } from "react";
import Link from "next/link";
import Select from "react-select";

import { PrimaryWeapon } from "@/types/weapon";

import { DEFAULT_PLAYER_SETTINGS } from "@/constants/settings";

import { useSettingsContext } from "@/lib/hooks/use-settings-context";
import { cn } from "@/lib/utils";

import RangeSlider from "@/components/Form/RangeSlider";

type SelectOption = {
  value: string;
  label: string;
};

const importantWeaponsOptions: SelectOption[] = Object.entries(PrimaryWeapon)
  .filter(([_key, value]) => typeof value === "number")
  .map(([key, value]) => ({ value: `${value}`, label: key }));

export default function SettingsSection() {
  const { showSettings, settings, showSettingsMenu, updateSettings } =
    useSettingsContext();

  const [isMounted, setIsMounted] = useState<boolean>(false);

  const [showPlayerHealth, setShowPlayerHealth] = useState<boolean>(
    settings.player.showHealth
  );

  const [showPlayerWeapon, setShowPlayerWeapon] = useState<boolean>(
    settings.player.showWeapon
  );

  const [playerMapRotation, setPlayerMapRotation] = useState<boolean>(
    settings.player.mapRotation
  );

  const [playerSteamId64, setPlayerSteamId64] = useState<string>(
    settings.player.steamId64
  );

  const [playerDotSize, setPlayerDotSize] = useState<number>(
    settings.player.dotSize
  );

  const [playerImportantWeapons, setPlayerImportantWeapons] = useState<
    number[]
  >(settings.player.importantWeapons);

  const getImportantWeaponsValue = useCallback(
    (importantWeapons: number[]): SelectOption[] => {
      return importantWeapons.map((value) => ({
        value: `${value}`,
        label: PrimaryWeapon[value],
      }));
    },
    []
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const togglePlayerHealth = useCallback(() => {
    setShowPlayerHealth((health) => !health);
  }, []);

  const togglePlayerWeapon = useCallback(() => {
    setShowPlayerWeapon((weapon) => !weapon);
  }, []);

  const togglePlayerMapRotation = useCallback(() => {
    setPlayerMapRotation((rotation) => !rotation);
  }, []);

  const handlePlayerSteamId64 = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPlayerSteamId64((event.target as HTMLInputElement).value);
    },
    []
  );

  const handlePlayerDotSize = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const dotSize =
        parseInt((event.target as HTMLInputElement).value) ||
        settings.player.dotSize;

      setPlayerDotSize(dotSize);
    },
    [settings.player.dotSize]
  );

  const handlePlayerImportantWeapons = useCallback(
    (option: readonly SelectOption[]) => {
      const importantWeapons: number[] = option
        .map(({ value }) => parseInt(value))
        .filter((num) => !isNaN(num));

      setPlayerImportantWeapons(importantWeapons);
    },
    []
  );

  const handleSave = useCallback(() => {
    updateSettings({
      ...settings,
      player: {
        ...settings.player,
        showHealth: showPlayerHealth,
        showWeapon: showPlayerWeapon,
        mapRotation: playerMapRotation,
        steamId64: playerSteamId64,
        dotSize: playerDotSize,
        importantWeapons: playerImportantWeapons,
      },
    });
  }, [
    showPlayerHealth,
    showPlayerWeapon,
    playerMapRotation,
    playerSteamId64,
    playerDotSize,
    playerImportantWeapons,
    settings,
    updateSettings,
  ]);

  const handleRestoreDefaults = useCallback(() => {
    setShowPlayerHealth(DEFAULT_PLAYER_SETTINGS.showHealth);
    setShowPlayerWeapon(DEFAULT_PLAYER_SETTINGS.showWeapon);
    setPlayerMapRotation(DEFAULT_PLAYER_SETTINGS.mapRotation);
    setPlayerSteamId64(DEFAULT_PLAYER_SETTINGS.steamId64);
    setPlayerDotSize(DEFAULT_PLAYER_SETTINGS.dotSize);
    setPlayerImportantWeapons(DEFAULT_PLAYER_SETTINGS.importantWeapons);
  }, []);

  const handleClose = useCallback(() => {
    showSettingsMenu(false);
    setShowPlayerHealth(settings.player.showHealth);
    setShowPlayerWeapon(settings.player.showWeapon);
    setPlayerMapRotation(settings.player.mapRotation);
    setPlayerSteamId64(settings.player.steamId64);
    setPlayerDotSize(settings.player.dotSize);
    setPlayerImportantWeapons(settings.player.importantWeapons);
  }, [
    settings.player.showHealth,
    settings.player.showWeapon,
    settings.player.mapRotation,
    settings.player.steamId64,
    settings.player.dotSize,
    settings.player.importantWeapons,
    showSettingsMenu,
  ]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-10 flex h-full max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50 md:inset-0",
        !showSettings && "hidden"
      )}
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
              <div className="col-span-2">
                <label className="mb-2 block text-sm font-medium">
                  Player Info
                </label>

                <div className="grid grid-cols-2 gap-2">
                  <label className="col-span-2 inline-flex cursor-pointer items-center align-middle sm:col-span-1">
                    <input
                      className="peer sr-only"
                      type="checkbox"
                      value="player-health"
                      checked={showPlayerHealth}
                      onClick={togglePlayerHealth}
                      readOnly
                    />
                    <div className="peer relative h-6 w-11 rounded-full bg-zinc-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-zinc-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:bg-zinc-900 dark:after:border-zinc-600 dark:peer-focus:ring-blue-800"></div>
                    <span className="ms-3 text-sm font-medium">Health</span>
                  </label>

                  <label className="col-span-2 inline-flex cursor-pointer items-center align-middle sm:col-span-1">
                    <input
                      className="peer sr-only"
                      type="checkbox"
                      value="player-weapon"
                      checked={showPlayerWeapon}
                      onClick={togglePlayerWeapon}
                      readOnly
                    />
                    <div className="peer relative h-6 w-11 rounded-full bg-zinc-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-zinc-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:bg-zinc-900 dark:after:border-zinc-600 dark:peer-focus:ring-blue-800"></div>
                    <span className="ms-3 text-sm font-medium">Weapon</span>
                  </label>
                </div>
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="settings-player-dot-size"
                  className="mb-2 block text-sm font-medium"
                >
                  Player Dot Size
                </label>
                <RangeSlider
                  id="settings-player-dot-size"
                  onChange={handlePlayerDotSize}
                  className="mb-1 mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 focus:outline-blue-700 dark:bg-zinc-900"
                  min={12}
                  max={20}
                  value={playerDotSize}
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
              <div className="col-span-2">
                <label className="mb-2 block text-sm font-medium">
                  Map Rotation
                </label>

                <label className="mb-2 inline-flex cursor-pointer items-center align-middle">
                  <input
                    className="peer sr-only"
                    type="checkbox"
                    value="player-map-rotation"
                    checked={playerMapRotation}
                    onClick={togglePlayerMapRotation}
                    readOnly
                  />
                  <div className="peer relative h-6 w-11 rounded-full bg-zinc-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-zinc-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:bg-zinc-900 dark:after:border-zinc-600 dark:peer-focus:ring-blue-800"></div>
                  <span className="ms-3 text-sm font-medium">Enable</span>
                </label>

                {playerMapRotation && (
                  <>
                    <input
                      type="text"
                      className="block w-full rounded border border-zinc-300 bg-zinc-50 p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500  dark:border-zinc-600 dark:bg-zinc-900 dark:placeholder-zinc-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="Your SteamID64 (e.g 76561197960287930)"
                      value={playerSteamId64}
                      onChange={handlePlayerSteamId64}
                      disabled={!playerMapRotation}
                    />

                    <p
                      id="steamid-helper-text"
                      className="mt-2 text-sm text-gray-500 dark:text-gray-400"
                    >
                      You can find your SteamID64{" "}
                      <Link
                        href="https://steamid.io/lookup/"
                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        target="_blank"
                      >
                        here
                      </Link>
                      .
                    </p>
                  </>
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
