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
          width={20}
          height={20}
          alt={"Defuse Kit"}
        />
      )}
      {hasBomb && (
        <MaskedIcon
          path={`/assets/icons/c4.svg`}
          width={20}
          height={20}
          alt={"C4"}
        />
      )}
    </>
  );
}
