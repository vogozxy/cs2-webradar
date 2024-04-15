"use client";

import React, { useState, useEffect, useRef } from "react";

import { Team } from "@/types/team";
import { type GameData } from "@/types/gameData";
import { type MapData } from "@/types/mapData";
import type { Player } from "@/types/player";

import { GAME_DATA } from "@/constants/gameData";
import { playerColors } from "@/constants/playerColors";

import { isObjectEmpty } from "@/lib/isObjectEmpty";
import { getPlayerRadarPosition, getPlayerViewDirection, isPlayerHasBomb } from "@/lib/player";

import { useInterval } from "@/hooks/useInterval";

import PlayersInfo from "@/components/PlayersInfo";
import ThemeSwitch from "@/components/ThemeSwitch";

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

const drawPlayerOnMap = (
  context: CanvasRenderingContext2D,
  radarTheme: "default" | "classic",
  player: Player,
  map: MapData,
  currentTeam: Team,
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
  }, 50);

  // Handle map change
  useEffect(() => {
    // It will only fetch the map data if the map changes
    if (!currentMap) return;

    const backgroundCanvas = backgroundCanvasRef.current;
    const mainCanvas = mainCanvasRef.current;
    if (!backgroundCanvas || !mainCanvas) return;

    const backgroundCanvasContext = backgroundCanvas.getContext("2d");
    const mainCanvasContext = mainCanvas.getContext("2d");
    if (!backgroundCanvasContext || !mainCanvasContext) return;

    mainCanvasContext.reset();

    console.log(1);

    resizeCanvasToDisplaySize(backgroundCanvas);
    resizeCanvasToDisplaySize(mainCanvas);

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
        const scale = Math.min(mainCanvas.width / data.width, mainCanvas.height / data.height);
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
    mainCanvasContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);

    const currentTeam = gameData.local_player.team;

    // Draw local player
    drawPlayerOnMap(
      mainCanvasContext,
      radarTheme,
      gameData.local_player,
      mapData,
      currentTeam,
    );

    // Draw other players
    gameData.players.map((player) =>
      drawPlayerOnMap(
        mainCanvasContext,
        radarTheme,
        player,
        mapData,
        currentTeam,
      )
    );
  });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const radar = document.getElementById('radar');
    
    const handleResize = () => {
      radar?.classList.add('opacity-0');
      radar?.classList.add('h-0');
      radar?.classList.add('w-0');
      clearTimeout(timer);
      timer = setTimeout(run, 300);
    }
    
    const run = () => {
      radar?.classList.remove('opacity-0');
      radar?.classList.remove('h-0');
      radar?.classList.remove('w-0');

      setCurrentMap('');
    }
    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <>
    <header>
      <button 
        onClick={handleRadarTheme}
        className="bg-black/5 dark:bg-white/5 rounded-lg w-10 h-10 p-2 overflow-hidden">
        <div className={(radarTheme === 'default' ? 'translate-y-0':'-translate-y-8')+' transform transition duration-200 ease-in-out'}>
          <svg className="w-6 h-6 mb-2" viewBox="0 0 24 24" fill="none">
            <path d="M12 24C8.8174 24 5.76516 22.7357 3.51472 20.4853C1.26428 18.2348 2.40279e-07 15.1826 0 12C-2.40279e-07 8.8174 1.26428 5.76516 3.51472 3.51472C5.76515 1.26428 8.8174 4.80559e-07 12 0L12 12L12 24Z" fill="#DF7D29"/>
            <path d="M12 0C15.1826 0 18.2348 1.26428 20.4853 3.51472C22.7357 5.76515 24 8.8174 24 12C24 15.1826 22.7357 18.2348 20.4853 20.4853C18.2348 22.7357 15.1826 24 12 24L12 12V0Z" fill="#84C8ED"/>
          </svg>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path d="M12 24C8.8174 24 5.76516 22.7357 3.51472 20.4853C1.26428 18.2348 2.40279e-07 15.1826 0 12C-2.40279e-07 8.8174 1.26428 5.76516 3.51472 3.51472C5.76515 1.26428 8.8174 4.80559e-07 12 0L12 12L12 24Z" fill="#FF0000"/>
            <path d="M12 0C15.1826 0 18.2348 1.26428 20.4853 3.51472C22.7357 5.76515 24 8.8174 24 12C24 15.1826 22.7357 18.2348 20.4853 20.4853C18.2348 22.7357 15.1826 24 12 24L12 12V0Z" fill="#00FF00"/>
          </svg>
        </div>
      </button>
      <ThemeSwitch />
    </header>
    <main className="flex flex-col-reverse lg:flex-row justify-center lg:gap-4 px-4 pb-4 min-h-[calc(100vh-72px)]">
      <section id="players" className={(gameData?.local_player.team == Team.Terrorist?'flex-col':'flex-col-reverse')+' flex lg:max-w-xl w-full shrink-0 h-fit'}>
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
      </section>

      <section className="relative w-full h-[calc(100vw-2rem-1px)] lg:h-auto rounded-lg bg-black/5 dark:bg-white/5">
        {currentMap==''?
        <div className="absolute flex justify-center items-center w-full h-full">
          <div className="font-mono text-2xl text-center">
            <div className="bg-red-600 text-white">ATTENTION</div>
            <div className="bg-sky-500 text-black py-6 px-8">NO SIGNAL INPUT</div>
          </div>
        </div>
        :null}
        <div id="radar" className="w-full h-full">

        <canvas
          ref={backgroundCanvasRef}
          className="mx-auto"
          // className="absolute h-full w-full border border-gray-300"
        >
          If you see this text your browser can&apos;t draw the canvas
        </canvas>
        <canvas
          ref={mainCanvasRef}
          className="absolute inset-0 mx-auto"
        >
          If you see this text your browser can&apos;t draw the canvas
        </canvas>
        </div>
      </section>
    </main>
    <div className="fixed inset-0 blur-md -z-10 overflow-hidden">
        <div className="bg"></div>
    </div>
    </>
  );
}
