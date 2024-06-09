import BombPlantedStatus from "./BombPlantedStatus";
import BombDefuseStatus from "./BombDefuseStatus";

export default function BombSection() {
  return (
    <div className="mx-4 my-2 flex w-auto items-center justify-center gap-4 rounded-lg bg-black/5 p-2 dark:bg-white/5">
      <BombPlantedStatus />

      <hr className="rounded border-4 border-gray-800 dark:border-white" />

      <BombDefuseStatus />
    </div>
  );
}
