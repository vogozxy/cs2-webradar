import { type Player } from "@/types/player";
import { type Bomb } from "@/types/bomb";

export type GameData = {
  map: string;
  bomb: Bomb;
  local_player: Player;
  players: Player[];
} | null;
