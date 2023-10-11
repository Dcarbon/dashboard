import Container from "src/components/ui/Container";
import Section from "src/components/ui/Section";
import stls from "./index.module.scss";
import Heading from "src/components/ui/Heading";
import Button from "src/components/ui/Button";
import Earth from "../earth";
import { imgsObject } from "src/tools/const";
function BannerFisrt() {
  return (
    <Section
      className="relative overflow-hidden z-10"
      bgImageUrl={imgsObject.home.banner}
    >
      <Container>
        <div className={stls.box}>
          <div className={stls.boxText}>
            <Heading Tag={"h1"} className={stls.heading}>
              <span className={stls.strong}> DCarbon</span> a Trustless and
              autonomous Carbon system
            </Heading>
            <p className={stls.sub_heading}>
              Accurately measure, report and verify carbon footprints reduced,
              then bring them to the blockchains.
            </p>
            <Button href={"/how-does-it-work"}>Learn more</Button>
          </div>
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          <div className={`${stls.earth}`}>
            <Earth />
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default BannerFisrt;
