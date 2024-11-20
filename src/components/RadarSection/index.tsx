import { useMeasure } from "@uidotdev/usehooks";

import RadarMain from "./RadarMain";
import RadarBackground from "./RadarBackground";

type RadarSectionProps = {} & React.HTMLAttributes<HTMLElement>;

export default function RadarSection({ ...props }: RadarSectionProps) {
  const [radarRef, radarSize] = useMeasure();

  return (
    <section ref={radarRef} id="radar" {...props}>
      <RadarBackground />
      <RadarMain
        radarSize={{
          width: radarSize.width || 0,
          height: radarSize.height || 0,
        }}
      />
    </section>
  );
}
