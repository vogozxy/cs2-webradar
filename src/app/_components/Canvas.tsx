import React, { useEffect, useRef } from "react";

export default function Canvas({
  className,
  draw,
}: {
  className?: string;
  draw?: (context: CanvasRenderingContext2D) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    draw?.(context);

    const resizeCanvas = () => {
      const canvasWidth =
        canvas.parentElement?.clientWidth || canvas.clientWidth;

      const canvasHeight =
        canvas.parentElement?.clientHeight || canvas.clientHeight;

      if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [draw]);

  return (
    <canvas ref={canvasRef} className={className}>
      If you see this text your browser can&apos;t draw the canvas
    </canvas>
  );
}
