import { useContext, useState, useEffect } from "react";

import { GameContext } from "@/contexts/game";

import Canvas from "@/components/Canvas";

export default function RadarBackground() {
  const [imageDrawn, setImageDrawn] = useState<boolean>(false);

  const gameCtx = useContext(GameContext);

  const mapName = gameCtx.currentMap;

  const drawMapBackground = (context: CanvasRenderingContext2D) => {
    if (mapName === "" || mapName === "<empty>") {
      context.reset();
      setImageDrawn(false);
      return;
    }

    if (imageDrawn) return;

    context.reset();

    const image = new Image();
    image.src = `/maps/${mapName}/radar.png`;
    image.onload = () => {
      // Calculate the scale to fit the image on the canvas
      const scale = Math.min(
        context.canvas.width / image.width,
        context.canvas.height / image.height
      );

      // Calculate the new width and height of the image
      const newWidth = image.width * scale;
      const newHeight = image.height * scale;

      // Calculate the position to center the image on the canvas
      const offsetX = (context.canvas.width - newWidth) / 2;
      const offsetY = (context.canvas.height - newHeight) / 2;

      // Draw the image centered on the canvas
      context.drawImage(image, offsetX, offsetY, newWidth, newHeight);

      setImageDrawn(true);
    };
  };

  useEffect(() => {
    setImageDrawn(false);
  }, [mapName]);

  useEffect(() => {
    const handleResize = () => {
      setImageDrawn(false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <Canvas className="mx-auto" draw={drawMapBackground} />;
}
