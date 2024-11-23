"use client";

import { createContext } from "react";

import { type GameData } from "@/types/gameData";
import { type MapData } from "@/types/map";

interface IContext {
  gameData: GameData;
  mapData: MapData;
  currentMap: string;
  inMatch: boolean;
}

export const GameContext = createContext<IContext>({
  gameData: null,
  mapData: null,
  currentMap: "",
  inMatch: false,
});
