import Container from "src/components/ui/Container";
import Heading from "src/components/ui/Heading";
import { imgsDir, imgsObject } from "src/tools/const";
import stls from "./index.module.scss";
import Section from "src/components/ui/Section";
import Image from "next/image";

function Section_1() {
  const bgColor = `radial-gradient(
        85.14% 85.14% at 50% 52.83%,
        rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%),
        linear-gradient(180deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 100%),
        linear-gradient(90.03deg, #5154A4 -2.72%, #72BF44 105.01%)`;
  return (
    <Section className={stls.section} multiplebgImageUrl={` ${bgColor}`}>
      <Container>
        <div className={`relative ${stls.box}`}>
          <Heading Tag={"h1"} className={"text-[#FCFCFC]"}>
            DCarbon DAO
          </Heading>
          <Image
            priority
            className={stls.image}
            src={imgsDir(imgsObject.DDAO.banner)}
            alt="banner section 1"
            width={1200}
            height={1200}
          />
        </div>
      </Container>
    </Section>
  );
}

export default Section_1;
