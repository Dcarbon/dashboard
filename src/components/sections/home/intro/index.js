import Container from "src/components/ui/Container";
import Section from "src/components/ui/Section";
import stls from "./index.module.scss";
import Heading from "src/components/ui/Heading";
import Button from "src/components/ui/Button";
import Image from "next/image";
import { imgsDir, imgsObject } from "src/tools/const";
import FlexBetween from "src/components/ui/Stack/flex-between";
function IntroDcarbon() {
  return (
    <Section className={`${stls.section} relative`}>
      <Container className={stls.container}>
        <FlexBetween
          className={`${stls.box}  items-center flex-col md:flex-row`}
        >
          <div className={stls.left}>
            <Heading Tag={"h2"} textGradient className={"mb-4"}>
              What is DCarbon?
            </Heading>
            <p className={"mb-10"}>
              DCarbon is the modern panacea for traditional carbon offsetting
              process. <br />
              By using Blockchain and IoT, DCarbon bridges the market
              fragmentation, together steering innovations towards a green
              economy
            </p>
            <Button href={"/how-does-it-work"}>Learn more</Button>
          </div>
          <div className={stls.right}>
            <div className={stls.images}>
              <Image
                className={stls.laptop}
                src={imgsDir(imgsObject.Laptop_1)}
                alt="Laptop"
                width={425}
                height={425}
              />{" "}
              <Image
                className={stls.cloud}
                src={imgsDir(imgsObject.Cloud_1)}
                alt="cloud"
                width={160}
                height={160}
              />
            </div>
          </div>
        </FlexBetween>
      </Container>
    </Section>
  );
}

export default IntroDcarbon;
