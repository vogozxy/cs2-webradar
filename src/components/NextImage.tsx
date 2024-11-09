import Image from "next/image";

export default function NextImage({
  src,
  width,
  height,
  className,
  alt = "",
}: {
  src: string;
  width: number;
  height: number;
  className?: string;
  alt?: string;
}) {
  return (
    <Image
      src={src}
      width={width}
      height={height}
      className={className}
      alt={alt}
    />
  );
}
