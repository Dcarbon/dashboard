import Image from "next/image";
import { useCallback } from "react";
import { imgsDir } from "src/tools/const";

export default function IconSvg({ img, size }) {
  const configSize = useCallback(() => {
    switch (size) {
      case "xs":
        return 10;
      case "sm":
        return 20;
      case "md":
        return 30;
      case "lg":
        return 40;
      case "xl":
        return 60;
      default:
        return size;
    }
  }, [size]);
  return (
    <Image
      src={imgsDir(img)}
      alt='icon'
      fill={!size}
      width={size ? configSize() : 0}
      height={size ? configSize() : 0}
      style={{ display: "inline-block" }}
    />
  );
}
