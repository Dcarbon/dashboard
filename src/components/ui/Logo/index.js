import Image from "next/image";
import { imgsDir, imgsObject } from "src/tools/const";

function Logo() {
  return (
    <Image
      src={imgsDir(imgsObject.logo)}
      alt="D-carbon logo"
      width={272}
      height={42}
    />
  );
}

export default Logo;
