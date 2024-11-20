import { memo } from "react";

import { ArmorIcon } from "@/components/Icons";

type PlayerArmorProps = {
  armor: number;
  hasHelmet: boolean;
};

function PlayerArmor({ armor, hasHelmet }: PlayerArmorProps) {
  return (
    <div className="flex h-6 w-6 shrink-0 list-none items-center justify-center rounded-md bg-black/10 text-center dark:bg-white/5">
      {armor > 0 && <ArmorIcon hasHelmet={hasHelmet} size={20} />}
    </div>
  );
}

export default memo(PlayerArmor);
