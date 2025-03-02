import { type Team } from "@/types/team";

export type PlayerPosition = {
  x: number;
  y: number;
  z: number;
};

export type PlayerViewAngles = {
  x: number;
  y: number;
};

export type Player = {
  index: number;
  steamid3: number;
  alive: boolean;
  color: number;
  nickname: string;
  team: Team;
  health: number;
  armor: number;
  has_helmet: boolean;
  money: number;
  weapons: number[];
  has_bomb: boolean;
  has_defuser: boolean;
  flash_alpha: number;
  position: PlayerPosition;
  view_angles: PlayerViewAngles;
};
