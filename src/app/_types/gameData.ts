import { type Player } from "@/types/player";

export type GameData = {
  map: string;
  local_player: Player;
  players: Player[];
} | null;
