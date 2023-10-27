import Image from "next/image";
import Link from "next/link";
import { imgsDir, imgsObject } from "src/tools/const";
import stls from "./logo.module.scss";
function Logo() {
  return (
    <Link href={"/"} className={`${stls.logo} relative `}>
      <Image
        src={imgsDir(imgsObject.logo)}
        alt=""
        width={272}
        height={42}
        priority
        style={{
          width: "100%",
          height: "auto",
        }}
      />
    </Link>
  );
}

export default Logo;
