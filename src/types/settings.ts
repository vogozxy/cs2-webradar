import { PrimaryWeapon } from "@/types/weapon";

export type PlayerSettings = {
  showHealth: boolean;
  showWeapon: boolean;
  mapRotation: boolean;
  steamId64: string;
  dotSize: number;
  labelSize: number;
  importantWeapons: PrimaryWeapon[];
};

export type Settings = {
  player: PlayerSettings;
};
