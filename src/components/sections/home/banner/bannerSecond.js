import Container from "src/components/ui/Container";
import Heading from "src/components/ui/Heading";
import Section from "src/components/ui/Section";
import stls from "./bannerSecond.module.scss";
import { imgsObject } from "src/tools/const";
function BannerSecond() {
  return (
    <Section
      className={`relative ${stls.section}`}
      bgImageUrl={imgsObject.home_banner2}
    >
      <Container>
        <div className='flex flex-col justify-between'>
          <div className={stls.heading_left}>
            <Heading Tag={"h1"} className={stls.bigHeading}>
              Fair to us
            </Heading>
          </div>
          <div className={stls.heading_right}>
            <Heading Tag={"h1"} className={stls.bigHeading}>
              Fair to earth
            </Heading>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default BannerSecond;
