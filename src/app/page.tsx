"use client";

import React, { useState, useEffect, useRef } from "react";

import { Team } from "@/types/team";
import { type GameData } from "@/types/gameData";
import { type MapData } from "@/types/mapData";
import type { Player } from "@/types/player";

import { GAME_DATA } from "@/constants/gameData";
import { playerColors } from "@/constants/playerColors";

import { isObjectEmpty } from "@/lib/isObjectEmpty";
import { getPlayerRadarPosition, getPlayerViewDirection } from "@/lib/player";

import { useInterval } from "@/hooks/useInterval";

import PlayersInfo from "@/components/PlayersInfo";

const resizeCanvasToDisplaySize = (canvas: HTMLCanvasElement) => {
  // look up the size the canvas is being displayed
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  // If it's resolution does not match change it
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
};

const drawPlayerOnMap = (
  context: CanvasRenderingContext2D,
  radarTheme: "default" | "classic",
  player: Player,
  map: MapData,
  currentTeam: Team
) => {
  const dotSize = 6;
  const isTeammate = player.team === currentTeam;
  const color =
    radarTheme === "default"
      ? playerColors[player.color]
      : isTeammate
        ? "#00ff00"
        : "#ff0000";

  // Calculate player position on radar
  const playerPosition = getPlayerRadarPosition(player.position, map);

  // Calculate view direction
  const playerViewDirection = getPlayerViewDirection(
    playerPosition,
    player.view_angles
  );

  // Begin drawing player circle
  context.beginPath();
  context.arc(
    playerPosition.x,
    playerPosition.y,
    Math.abs(dotSize),
    0,
    2 * Math.PI
  );

  if (isTeammate) {
    if (radarTheme === "default") {
      context.strokeStyle = color;
      context.stroke();
    } else {
      context.fillStyle = color;
      context.fill();
    }
  } else {
    context.fillStyle = color;
    context.fill();
  }

  // Draw view direction
  context.beginPath();
  context.moveTo(playerPosition.x, playerPosition.y);
  context.lineTo(playerViewDirection.x, playerViewDirection.y);
  context.strokeStyle = color;
  context.lineWidth = 2;
  context.stroke();
};

const changeMapBackground = (
  currentMapName: string,
  context: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  context.clearRect(0, 0, width, height);

  const image = new Image();
  image.src = `/maps/${currentMapName}/radar.png`;
  image.onload = () => {
    // Calculate the scale to fit the image on the canvas
    // const scale = Math.min(width / image.width, height / image.height);

    // // Calculate the new width and height of the image
    // const newWidth = image.width * scale;
    // const newHeight = image.height * scale;

    // // Calculate the position to center the image on the canvas
    // const x = (width - newWidth) / 2;
    // const y = (height - newHeight) / 2;

    // context.drawImage(image, x, y, newWidth, newHeight);

    context.drawImage(image, 0, 0);
  };
};

export default function Home() {
  const mainCanvasRef = useRef<HTMLCanvasElement>(null);
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null);

  const [gameData, setGameData] = useState<GameData>(null);
  const [currentMap, setCurrentMap] = useState<string>("");
  const [mapData, setMapData] = useState<MapData>(null);
  const [radarTheme, setRadarTheme] = useState<"default" | "classic">(
    "default"
  );

  const handleRadarTheme = () => {
    setRadarTheme(radarTheme === "default" ? "classic" : "default");
  };

  // Fetch game data
  useInterval(() => {
    fetch("/api/webradar")
      .then((response) => response.json())
      .then((response) => {
        const gameData =
          process.env.NEXT_PUBLIC_NODE_ENV === "production"
            ? response?.data?.gameData
            : GAME_DATA;

        setGameData(gameData);
        setCurrentMap(gameData?.map ?? "");
      });
  }, 25);

  // Handle map change
  useEffect(() => {
    // It will only fetch the map data if the map changes
    if (!currentMap) return;

    const backgroundCanvas = backgroundCanvasRef.current;
    if (!backgroundCanvas) return;

    const backgroundCanvasContext = backgroundCanvas.getContext("2d");
    if (!backgroundCanvasContext) return;

    resizeCanvasToDisplaySize(backgroundCanvas);

    changeMapBackground(
      currentMap,
      backgroundCanvasContext,
      backgroundCanvas.width,
      backgroundCanvas.height
    );

    fetch(`/maps/${currentMap}/data.json`)
      .then((response) => response.json())
      .then((data) => setMapData(data));
  }, [currentMap]);

  useEffect(() => {
    const mainCanvas = mainCanvasRef.current;
    if (!mainCanvas) return;

    const mainCanvasContext = mainCanvas.getContext("2d");
    if (!mainCanvasContext) return;

    if (!gameData || !mapData) return;
    if (isObjectEmpty(gameData) || isObjectEmpty(mapData)) return;

    resizeCanvasToDisplaySize(mainCanvas);

    // Clear canvas
    mainCanvasContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);

    const currentTeam = gameData.local_player.team;

    // Draw local player
    drawPlayerOnMap(
      mainCanvasContext,
      radarTheme,
      gameData.local_player,
      mapData,
      currentTeam
    );

    // Draw other players
    gameData.players.map((player) =>
      drawPlayerOnMap(
        mainCanvasContext,
        radarTheme,
        player,
        mapData,
        currentTeam
      )
    );
  });

  return (
    <main className="flex flex-col justify-between gap-4 xl:flex-row">
      <section id="players" className="w-[50em] ps-[0.5em] font-bold">
        <PlayersInfo
          currentTeam={Team.CounterTerrorist}
          localPlayer={gameData?.local_player}
          otherPlayers={gameData?.players}
        />

        <PlayersInfo
          currentTeam={Team.Terrorist}
          localPlayer={gameData?.local_player}
          otherPlayers={gameData?.players}
        />

        <p>Radar theme: {radarTheme}</p>
        <button
          className="inline-block cursor-pointer rounded bg-gray-600 p-4 text-center text-base capitalize text-white hover:bg-gray-700"
          onClick={handleRadarTheme}
        >
          Toggle Radar Theme
        </button>
      </section>

      <section
        id="radar"
        className="relative h-screen w-screen border border-red-500"
      >
        <canvas
          ref={backgroundCanvasRef}
          className="absolute h-full w-full border border-gray-300"
        >
          If you see this text your browser can&apos;t draw the canvas
        </canvas>
        <canvas
          ref={mainCanvasRef}
          className="absolute h-full w-full border border-gray-300"
        >
          If you see this text your browser can&apos;t draw the canvas
        </canvas>
      </section>
    </main>
  );
}
