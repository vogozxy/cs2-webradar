import { memo } from "react";

import { BombIcon, DefuserIcon } from "@/components/Icons";

type PlayerMiscProps = {
  hasDefuser: boolean;
  hasBomb: boolean;
};

function PlayerMisc({ hasDefuser, hasBomb }: PlayerMiscProps) {
  return (
    <div className="flex h-6 w-6 shrink-0 list-none items-center justify-center rounded-md bg-black/10 text-center dark:bg-white/5">
      {hasDefuser && <DefuserIcon size={20} />}
      {hasBomb && <BombIcon size={20} />}
    </div>
  );
}

export default memo(PlayerMisc);
