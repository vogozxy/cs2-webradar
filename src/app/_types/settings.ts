import { PrimaryWeapon } from "@/types/weapon";

export type PlayerSettings = {
  dotSize: number;
  viewAngleLength: number;
  importantWeapons: PrimaryWeapon[];
};

export type Settings = {
  player: PlayerSettings;
};
