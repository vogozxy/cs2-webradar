import { useEffect, useRef } from "react";

export const useInterval = (callback: () => void, delay: number): void => {
  const savedCallback = useRef<(() => void) | null>(null);

  // After every render, save the latest callback into our ref.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
