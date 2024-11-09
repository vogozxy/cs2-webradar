"use client";

import { ReactNode, Fragment } from "react";

import { SettingsProvider } from "@/contexts/settings";
import { GameProvider } from "@/contexts/game";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <Fragment>
      <SettingsProvider>
        <GameProvider>{children}</GameProvider>
      </SettingsProvider>
    </Fragment>
  );
}
