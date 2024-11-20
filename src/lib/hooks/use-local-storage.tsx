"use client";

import React, { useCallback, useEffect, useSyncExternalStore } from "react";

const dispatchStorageEvent = (key: string | null, newValue: string | null) => {
  window.dispatchEvent(new StorageEvent("storage", { key, newValue }));
};

const setLocalStorageItem = <T,>(key: string, value: T) => {
  const stringifiedValue = JSON.stringify(value);
  window.localStorage.setItem(key, stringifiedValue);
  dispatchStorageEvent(key, stringifiedValue);
};

const removeLocalStorageItem = (key: string) => {
  window.localStorage.removeItem(key);
  dispatchStorageEvent(key, null);
};

const getLocalStorageItem = (key: string) => {
  return window.localStorage.getItem(key);
};

const useLocalStorageSubscribe = (
  callback: (event: StorageEvent) => void
): (() => void) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

const getLocalStorageServerSnapshot = <T,>(initialValue?: T) => {
  try {
    return typeof initialValue !== "undefined"
      ? JSON.stringify(initialValue)
      : null;
  } catch (error) {
    return null;
  }
};

export const useLocalStorage = <T,>(
  key: string,
  initialValue?: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const getSnapshot = () => getLocalStorageItem(key);

  const store = useSyncExternalStore(
    useLocalStorageSubscribe,
    getSnapshot,
    () => getLocalStorageServerSnapshot<T>(initialValue)
  );

  const setState = useCallback(
    (v: T | ((val: T) => T)) => {
      try {
        const nextState = v instanceof Function ? v(JSON.parse(store!)) : v;

        if (nextState === undefined || nextState === null) {
          removeLocalStorageItem(key);
        } else {
          setLocalStorageItem<T>(key, nextState);
        }
      } catch (e) {
        console.warn(e);
      }
    },
    [key, store]
  );

  useEffect(() => {
    if (
      getLocalStorageItem(key) === null &&
      typeof initialValue !== "undefined"
    ) {
      setLocalStorageItem<T>(key, initialValue);
    }
  }, [key, initialValue]);

  return [store ? JSON.parse(store) : initialValue, setState];
};
