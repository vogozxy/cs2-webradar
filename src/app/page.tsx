"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocalStorage, useInterval } from "usehooks-ts";

import { Team } from "@/types/team";
import { type GameData } from "@/types/gameData";
import { type MapData } from "@/types/mapData";
import type { Player } from "@/types/player";
import type { BombPosition } from "@/types/bomb";

import { GAME_DATA } from "@/constants/gameData";
import { playerColors } from "@/constants/playerColors";

import { isObjectEmpty } from "@/lib/isObjectEmpty";
import {
  getPlayerRadarPosition,
  getPlayerViewDirection,
  playerHasImportantWeapons,
} from "@/lib/player";
import { getBombRadarPosition } from "@/lib/bomb";

import PlayersInfo from "@/components/PlayersInfo";
import ThemeSwitch from "@/components/ThemeSwitch";
import BombPlantedStatus from "@/components/BombPlantedStatus";
import BombDefuseStatus from "@/components/BombDefuseStatus";

const resizeCanvasToDisplaySize = (canvas: HTMLCanvasElement) => {
  // look up the size the canvas is being displayed
  const width = canvas.parentElement?.clientHeight || canvas.clientHeight;
  const height = canvas.parentElement?.clientHeight || canvas.clientHeight;

  // If it's resolution does not match change it
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
};

const drawBombOnMap = (
  context: CanvasRenderingContext2D,
  bombPostion: BombPosition,
  map: MapData
) => {
  const bombPos = getBombRadarPosition(bombPostion, map);
  const x = bombPos.x;
  const y = bombPos.y;

  context.beginPath();
  context.font = "bold 20px Poppins";
  context.fillStyle = "#FFD700";
  context.textAlign = "center";
  context.fillText("C4", x, y);
};

const drawPlayerOnMap = (
  context: CanvasRenderingContext2D,
  radarTheme: "default" | "classic",
  player: Player,
  map: MapData,
  currentTeam: Team
) => {
  if (!player.alive) return;
  if (!player.position.x || !player.position.y) return;

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

  // Draw view direction
  context.beginPath();
  context.moveTo(playerPosition.x, playerPosition.y);
  context.lineTo(playerViewDirection.x, playerViewDirection.y);
  context.strokeStyle = color;
  context.lineWidth = 2;
  context.stroke();

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

  // Display important weapons on map
  context.font = "12px Poppins";
  context.fillStyle = "#FFFFE0";
  context.textAlign = "center";
  context.fillText(
    playerHasImportantWeapons(player.weapons),
    playerPosition.x,
    playerPosition.y + dotSize * 3
  );
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
    const scale = Math.min(width / image.width, height / image.height);

    // Calculate the new width and height of the image
    const newWidth = image.width * scale;
    const newHeight = image.height * scale;

    // Calculate the position to center the image on the canvas
    // const x = (width - newWidth) / 2;
    // const y = (height - newHeight) / 2;

    context.drawImage(image, 0, 0, newWidth, newHeight);
    // context.drawImage(image, 0, 0);
  };
};

export default function Home() {
  const mainCanvasRef = useRef<HTMLCanvasElement>(null);
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null);
  const radarRef = useRef<HTMLDivElement>(null);

  const [gameData, setGameData] = useState<GameData>(null);
  const [currentMap, setCurrentMap] = useState<string>("");
  const [isInMatch, setIsInMatch] = useState<boolean>(false);
  const [mapData, setMapData] = useState<MapData>(null);

  const [radarTheme, setRadarTheme] = useLocalStorage<"default" | "classic">(
    "radar_theme",
    "default"
  );

  const handleRadarTheme = () => {
    setRadarTheme(radarTheme === "default" ? "classic" : "default");
  };

  useEffect(() => {
    setRadarTheme(radarTheme);
  }, [radarTheme, setRadarTheme]);

  const connectToSSE = useCallback(() => {
    if (process.env.NEXT_PUBLIC_NODE_ENV !== "production") {
      const gameData: GameData = GAME_DATA;
      setGameData(gameData);
      setCurrentMap(gameData?.map ?? "");
      setIsInMatch(gameData?.map !== "" && gameData?.map !== "<empty>");
      return;
    }

    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_WEBRADAR_SSE_URL}`
    );

    eventSource.onopen = (event: Event) => {
      console.info("SSE connection has been established.");
    };

    eventSource.onmessage = (event: MessageEvent) => {
      const gameData: GameData = JSON.parse(event?.data ?? null);

      setGameData(gameData);
      setCurrentMap(gameData?.map ?? "");
      setIsInMatch(gameData?.map !== "" && gameData?.map !== "<empty>");
    };

    eventSource.onerror = (event: Event) => {
      eventSource.close();
      console.error("SSE Error!", event);

      setGameData(null);
      setCurrentMap("");
      setIsInMatch(false);

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

  // Handle map change
  // It will only fetch the map data if the map changes
  useEffect(() => {
    const backgroundCanvas = backgroundCanvasRef.current;
    const mainCanvas = mainCanvasRef.current;
    if (!backgroundCanvas || !mainCanvas) return;

    const backgroundCanvasContext = backgroundCanvas.getContext("2d");
    const mainCanvasContext = mainCanvas.getContext("2d");
    if (!backgroundCanvasContext || !mainCanvasContext) return;

    mainCanvasContext.reset();
    backgroundCanvasContext.reset();

    resizeCanvasToDisplaySize(backgroundCanvas);
    resizeCanvasToDisplaySize(mainCanvas);

    if (currentMap === "" || currentMap === "<empty>") {
      mainCanvasContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
      backgroundCanvasContext.clearRect(
        0,
        0,
        backgroundCanvas.width,
        backgroundCanvas.height
      );
      return;
    }

    changeMapBackground(
      currentMap,
      backgroundCanvasContext,
      backgroundCanvas.width,
      backgroundCanvas.height
    );

    fetch(`/maps/${currentMap}/data.json`)
      .then((response) => response.json())
      .then((data) => {
        mainCanvasContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
        const scale = Math.min(
          mainCanvas.width / data.width,
          mainCanvas.height / data.height
        );
        mainCanvasContext.scale(scale, scale);
        setMapData(data);
      });
  }, [currentMap]);

  useEffect(() => {
    const mainCanvas = mainCanvasRef.current;
    if (!mainCanvas) return;

    const mainCanvasContext = mainCanvas.getContext("2d");
    if (!mainCanvasContext) return;

    if (!gameData || !mapData) return;
    if (isObjectEmpty(gameData) || isObjectEmpty(mapData)) return;

    // Clear canvas
    mainCanvasContext.clearRect(0, 0, mapData.width, mapData.height);

    const currentTeam = gameData.local_player.team;

    // Draw bomb
    drawBombOnMap(mainCanvasContext, gameData.bomb.position, mapData);

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

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const radar = radarRef.current;

    const handleResize = () => {
      radar?.classList.add("opacity-0");
      radar?.classList.add("h-0");
      radar?.classList.add("w-0");
      clearTimeout(timer);
      timer = setTimeout(run, 300);
    };

    const run = () => {
      radar?.classList.remove("opacity-0");
      radar?.classList.remove("h-0");
      radar?.classList.remove("w-0");

      setCurrentMap("");
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <header>
        <button
          onClick={handleRadarTheme}
          className="h-10 w-10 overflow-hidden rounded-lg bg-black/5 p-2 dark:bg-white/5"
        >
          <div
            className={
              (radarTheme === "default" ? "translate-y-0" : "-translate-y-8") +
              " transform transition duration-200 ease-in-out"
            }
          >
            <svg className="mb-2 h-6 w-6" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 24C8.8174 24 5.76516 22.7357 3.51472 20.4853C1.26428 18.2348 2.40279e-07 15.1826 0 12C-2.40279e-07 8.8174 1.26428 5.76516 3.51472 3.51472C5.76515 1.26428 8.8174 4.80559e-07 12 0L12 12L12 24Z"
                fill="#DF7D29"
              />
              <path
                d="M12 0C15.1826 0 18.2348 1.26428 20.4853 3.51472C22.7357 5.76515 24 8.8174 24 12C24 15.1826 22.7357 18.2348 20.4853 20.4853C18.2348 22.7357 15.1826 24 12 24L12 12V0Z"
                fill="#84C8ED"
              />
            </svg>
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 24C8.8174 24 5.76516 22.7357 3.51472 20.4853C1.26428 18.2348 2.40279e-07 15.1826 0 12C-2.40279e-07 8.8174 1.26428 5.76516 3.51472 3.51472C5.76515 1.26428 8.8174 4.80559e-07 12 0L12 12L12 24Z"
                fill="#FF0000"
              />
              <path
                d="M12 0C15.1826 0 18.2348 1.26428 20.4853 3.51472C22.7357 5.76515 24 8.8174 24 12C24 15.1826 22.7357 18.2348 20.4853 20.4853C18.2348 22.7357 15.1826 24 12 24L12 12V0Z"
                fill="#00FF00"
              />
            </svg>
          </div>
        </button>
        <ThemeSwitch />
      </header>

      <div className="mx-4 my-2 flex items-center justify-center gap-4 rounded-lg bg-black/5 p-2 dark:bg-white/5">
        <BombPlantedStatus
          bombSite={gameData?.bomb.site ?? ""}
          detonationTime={gameData?.bomb.detonation_time ?? 0}
        />

        <hr className="rounded border-4 border-gray-800 dark:border-white" />

        <BombDefuseStatus
          isDefusing={gameData?.bomb.is_defusing ?? false}
          detonationTime={gameData?.bomb.detonation_time ?? 0}
          defuseTime={gameData?.bomb.defuse_time ?? 0}
        />
      </div>

      <main className="flex min-h-[calc(100vh-72px)] flex-col-reverse justify-center px-4 pb-4 lg:flex-row lg:gap-4">
        <section
          id="players"
          className={
            (gameData?.local_player.team == Team.Terrorist
              ? "flex-col"
              : "flex-col-reverse") + " flex h-fit w-full shrink-0 lg:max-w-xl"
          }
        >
          <PlayersInfo
            isInMatch={isInMatch}
            currentTeam={Team.CounterTerrorist}
            localPlayer={gameData?.local_player}
            otherPlayers={gameData?.players}
          />

          <PlayersInfo
            isInMatch={isInMatch}
            currentTeam={Team.Terrorist}
            localPlayer={gameData?.local_player}
            otherPlayers={gameData?.players}
          />
        </section>

        <section className="relative h-[calc(100vw-2rem-1px)] w-full rounded-lg bg-black/5 lg:h-auto dark:bg-white/5">
          {!isInMatch ? (
            <div className="absolute flex h-full w-full items-center justify-center">
              <div className="text-center font-mono text-2xl">
                <div className="bg-red-600 text-white">ATTENTION</div>
                <div className="bg-sky-500 px-8 py-6 text-black">
                  NO SIGNAL INPUT
                </div>
              </div>
            </div>
          ) : null}
          <div id="radar" ref={radarRef} className="h-full w-full">
            <canvas
              ref={backgroundCanvasRef}
              className="mx-auto"
              // className="absolute h-full w-full border border-gray-300"
            >
              If you see this text your browser can&apos;t draw the canvas
            </canvas>
            <canvas ref={mainCanvasRef} className="absolute inset-0 mx-auto">
              If you see this text your browser can&apos;t draw the canvas
            </canvas>
          </div>
        </section>
      </main>
      <div className="fixed inset-0 -z-10 overflow-hidden blur-md">
        <div className="bg"></div>
      </div>
    </>
  );
}
