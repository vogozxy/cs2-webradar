import { type GameData } from "@/types/gameData";

let gameData: GameData = null;

export const getGameData = (): GameData => {
  return gameData;
};

export const setGameData = (data: GameData) => {
  gameData = data;
};
