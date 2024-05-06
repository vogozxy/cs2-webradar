import MaskedIcon from "@/components/MaskedIcon";

export default function PlayerMisc({
  hasDefuser,
  hasBomb,
}: {
  hasDefuser: boolean;
  hasBomb: boolean;
}) {
  if (!hasDefuser && !hasBomb) {
    return <div className="flex h-6 w-6 shrink-0 list-none items-center justify-center rounded-md bg-black/10 text-center dark:bg-white/5"></div>;
  }

  return (
    <div className="flex h-6 w-6 shrink-0 list-none items-center justify-center rounded-md bg-black/10 text-center dark:bg-white/5">
      {hasDefuser && (
        <MaskedIcon
          path={`/assets/icons/defuser.svg`}
          width={18}
          height={18}
          className="h-5 w-5 brightness-[0.25] dark:brightness-100"
          alt={"Defuse Kit"}
        />
      )}
      {hasBomb && (
        <MaskedIcon
          path={`/assets/icons/c4.svg`}
          width={18}
          height={18}
          className="h-5 w-5 brightness-[0.25] dark:brightness-100"
          alt={"C4"}
        />
      )}
    </div>
  );
}
