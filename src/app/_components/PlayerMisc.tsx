import MaskedIcon from "@/components/MaskedIcon";

export default function PlayerMisc({
  hasDefuser,
  hasBomb,
}: {
  hasDefuser: boolean;
  hasBomb: boolean;
}) {
  if (!hasDefuser && !hasBomb) {
    return <span>&ndash;</span>;
  }

  return (
    <>
      {hasDefuser && (
        <MaskedIcon
          path={`/assets/icons/defuser.svg`}
          width={18}
          height={18}
          className="h-5 w-5"
          alt={"Defuse Kit"}
        />
      )}
      {hasBomb && (
        <MaskedIcon
          path={`/assets/icons/c4.svg`}
          width={18}
          height={18}
          className="h-5 w-5"
          alt={"C4"}
        />
      )}
    </>
  );
}
