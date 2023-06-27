import Image from "next/image";
import { imgsDir, imgsObject } from "src/tools/const";
import stls from "./index.module.scss";
import FlexBetween from "src/components/ui/Stack/flex-between";
import Link from "next/link";
function Header() {
  return (
    <header className="bg-[#0B0A12]">
      <div className="container mx-auto ">
        <FlexBetween className={"space-x-2 py-4"}>
          <Link href={"/"} className={`${stls.logo} relative `}>
            <Image
              src={imgsDir(imgsObject.logo)}
              alt=""
              fill
              priority
              // sizes="(max-width: 768px) 250,
              // (max-width: 1200px) 320,
              // 272"
            />
          </Link>
        </FlexBetween>
      </div>
    </header>
  );
}

export default Header;
