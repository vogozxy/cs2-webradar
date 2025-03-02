"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { io } from "socket.io-client";

import { type GameData } from "@/types/gameData";
import { Map } from "@/types/map";

import { useMapData } from "@/lib/hooks/use-map-data";

import { GameContext } from "@/contexts/game";

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [gameData, setGameData] = useState<GameData>(null);
  const [currentMap, setCurrentMap] = useState<string>("");
  const [inMatch, setInMatch] = useState<boolean>(false);
  const { mapData } = useMapData(currentMap);

  const searchParams = useSearchParams();
  const useSocketConnection = searchParams.has("socket");

  const connectToSSE = useCallback(() => {
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_WEBRADAR_HTTP}${process.env.NEXT_PUBLIC_WEBRADAR_SSE_ENDPOINT}`
    );

    eventSource.onopen = (_event: Event) => {
      console.info("SSE connection has been established.");
    };

    eventSource.onmessage = (event: MessageEvent) => {
      const gameData: GameData = JSON.parse(event?.data ?? null);

      const mapName =
        gameData?.map && gameData.map in Map ? gameData.map : "<unsupported>";

      setGameData(gameData);
      setCurrentMap(mapName);
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

  const connectToSocket = useCallback(() => {
    const socket = io(`${process.env.NEXT_PUBLIC_WEBRADAR_SOCKET}`, {
      path: `${process.env.NEXT_PUBLIC_WEBRADAR_SOCKET_ENDPOINT}`,
    });

    socket.on("connect", () => {
      if (socket.connected) {
        console.info(
          `Socket connection has been established. (Engine: ${socket.io.engine.transport.name})`
        );
      }
    });

    socket.on("connect_error", (_error: Error) => {
      if (!socket.active) {
        socket.connect();
      }
    });

    socket.on("upgrade", () => {
      console.info(
        `Socket connection has been upgraded. (Engine: ${socket.io.engine.transport.name})`
      );
    });

    socket.on("data", (gameData: GameData) => {
      const mapName =
        gameData?.map && gameData.map in Map ? gameData.map : "<unsupported>";

      setGameData(gameData);
      setCurrentMap(mapName);
      setInMatch(
        (gameData?.map ?? null) !== null &&
          gameData?.map !== "" &&
          gameData?.map !== "<empty>"
      );
    });

    return socket;
  }, []);

  // Fetch game data
  useEffect(() => {
    const connection = useSocketConnection ? connectToSocket() : connectToSSE();

    return () => {
      connection?.close();
    };
  }, [useSocketConnection, connectToSocket, connectToSSE]);

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
