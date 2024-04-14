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
  alive: boolean;
  color: number;
  nickname: string;
  team: Team;
  health: number;
  armor: number;
  has_helmet: boolean;
  money: number;
  weapons: number[];
  has_defuser: boolean;
  position: PlayerPosition;
  view_angles: PlayerViewAngles;
};
