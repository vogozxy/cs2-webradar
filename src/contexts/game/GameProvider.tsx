"use client";

import React, { useCallback, useEffect, useState } from "react";

import { type GameData } from "@/types/gameData";

import { GAME_DATA } from "@/constants/gameData";

import { useMapData } from "@/lib/hooks/use-map-data";

import { GameContext } from "@/contexts/game";

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [gameData, setGameData] = useState<GameData>(null);
  const [currentMap, setCurrentMap] = useState<string>("");
  const [inMatch, setInMatch] = useState<boolean>(false);
  const { mapData } = useMapData(currentMap);

  const connectToSSE = useCallback(() => {
    if (process.env.NEXT_PUBLIC_NODE_ENV !== "production") {
      const gameData: GameData = GAME_DATA.de_mirage;
      setGameData(gameData);
      setCurrentMap(gameData?.map ?? "");
      setInMatch(
        (gameData?.map ?? null) !== null &&
          gameData?.map !== "" &&
          gameData?.map !== "<empty>"
      );
      return;
    }

    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_WEBRADAR_SSE_URL}`
    );

    eventSource.onopen = (_event: Event) => {
      console.info("SSE connection has been established.");
    };

    eventSource.onmessage = (event: MessageEvent) => {
      const gameData: GameData = JSON.parse(event?.data ?? null);

      setGameData(gameData);
      setCurrentMap(gameData?.map ?? "");
      setInMatch(
        (gameData?.map ?? null) !== null &&
          gameData?.map !== "" &&
          gameData?.map !== "<empty>"
      );
    };

    eventSource.onerror = (event: Event) => {
      eventSource.close();
      console.error("SSE Error!", event);

      setGameData(null);
      setCurrentMap("");
      setInMatch(false);

      setTimeout(connectToSSE, 50);
    };

    return eventSource;
  }, []);

  // Fetch game data
  useEffect(() => {
    const eventSource = connectToSSE();

    return () => {
      eventSource?.close();
    };
  }, [connectToSSE]);

  return (
    <GameContext.Provider
      value={{
        gameData,
        mapData,
        currentMap,
        inMatch,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
