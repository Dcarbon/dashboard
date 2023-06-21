import Image from "next/image";
import { imgsDir } from "src/tools/const";

export default function IconSvg({ img, width, height }) {
  return (
    <Image
      src={imgsDir(img)}
      alt="icon"
      width={width}
      height={height}
      style={{ width: "auto", height: "auto" }}
    />
  );
}
