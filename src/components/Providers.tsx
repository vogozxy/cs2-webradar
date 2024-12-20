"use client";

import { ReactNode, Fragment, Suspense } from "react";
import { SWRConfig } from "swr";

import { SettingsProvider } from "@/contexts/settings";
import { GameProvider } from "@/contexts/game";

import { fetcher } from "@/lib/utils";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <Fragment>
      <SWRConfig
        value={{
          fetcher,
        }}
      >
        <SettingsProvider>
          <Suspense>
            <GameProvider>{children}</GameProvider>
          </Suspense>
        </SettingsProvider>
      </SWRConfig>
    </Fragment>
  );
}
