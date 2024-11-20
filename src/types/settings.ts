import { PrimaryWeapon } from "@/types/weapon";

export type PlayerSettings = {
  showHealth: boolean;
  showWeapon: boolean;
  dotSize: number;
  importantWeapons: PrimaryWeapon[];
};

export type Settings = {
  player: PlayerSettings;
};
