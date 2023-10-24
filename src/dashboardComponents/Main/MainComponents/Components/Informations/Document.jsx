import BoxBorder from "./components/Box";
import Li from "./components/liComponent";
import Link from "next/link";
import IconSvg from "src/components/ui/IconSvg";
import { imgsObject } from "src/tools/const";
function Document() {
  return (
    <BoxBorder label="Document">
      <ul>
        <Li
          textLeft={<Link href={"/"}>Document 1</Link>}
          textRight={
            <IconSvg img={imgsObject.Download} width={20} height={20} />
          }
        />
        <Li
          textLeft={<Link href={"/"}>Document 2</Link>}
          textRight={
            <IconSvg img={imgsObject.Download} width={20} height={20} />
          }
        />
        <Li
          noMarginBottom={true}
          textLeft={<Link href={"/"}>Document 3</Link>}
          textRight={
            <IconSvg img={imgsObject.Download} width={20} height={20} />
          }
        />
      </ul>
    </BoxBorder>
  );
}

export default Document;
