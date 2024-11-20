import type { Settings, PlayerSettings } from "@/types/settings";
import { PrimaryWeapon } from "@/types/weapon";

export const DEFAULT_PLAYER_SETTINGS: PlayerSettings = {
  showHealth: true,
  showWeapon: true,
  dotSize: 12,
  importantWeapons: [
    PrimaryWeapon.AWP,
    PrimaryWeapon.G3SG1,
    PrimaryWeapon.SCAR20,
    PrimaryWeapon.SSG08,
    PrimaryWeapon.SawedOff,
    PrimaryWeapon.MAG7,
    PrimaryWeapon.Nova,
    PrimaryWeapon.XM1014,
  ],
};

export const DEFAULT_SETTINGS: Settings = {
  player: DEFAULT_PLAYER_SETTINGS,
};
