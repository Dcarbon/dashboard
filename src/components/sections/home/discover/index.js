import Container from "src/components/ui/Container";
import Section from "src/components/ui/Section";
import { imgsDir, imgsObject } from "src/tools/const";
import stls from "./index.module.scss";
import Heading from "src/components/ui/Heading";
import Image from "next/image";
function Discover() {
  const mainBg = {
    url: `url(${imgsDir(imgsObject.home_banner_discover)})`,
    position: "center",
    size: "cover",
  };

  const configReturn = (key) => mainBg[key];
  return (
    <Section
      bgImageUrl={configReturn("url")}
      bgPosition={configReturn("position")}
      bgSize={configReturn("size")}
    >
      <Container>
        <div className={stls.box}>
          <div>
            <Image
              className={`${stls.icons} ${stls.icons_left}`}
              src={imgsDir(imgsObject.Polygon_1)}
              alt=""
              width={64}
              height={62}
            />
            <Image
              className={`${stls.icons} ${stls.icons_middle}`}
              src={imgsDir(imgsObject.Circle)}
              alt=""
              width={85}
              height={85}
            />
            <Image
              className={`${stls.icons} ${stls.icons_right}`}
              src={imgsDir(imgsObject.Polygon_2)}
              alt=""
              width={114}
              height={123}
            />
          </div>
          <div className={stls.left}>
            <Heading Tag={"h2"} className={"text-[#FCFCFC] mb-3"}>
              Discover <span className="uppercase">DCARBON</span>
            </Heading>
            <p className={stls.text}>
              Dcarbon is the modern panacea for traditional carbon offsetting
              process.
            </p>
            <p className={stls.text}>
              By using Blockchain and IoT, Dcarbon bridges the market
              fragmentation.
            </p>
          </div>
          <div className={stls.right}>
            <HexagonBox
              imgUrl={imgsDir(imgsObject.Manifesto)}
              text={"Read about the mission that drive the Dcarbon project"}
            />
            <HexagonBox
              imgUrl={imgsDir(imgsObject.Whitepaper)}
              text={
                "Our proposed solution, presenting evidence-based research, detailed analysis, and a strategic roadmap"
              }
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default Discover;
function HexagonBox({ imgUrl, text }) {
  return (
    <div className={stls.hexBox}>
      <div className={stls.hexagon}>
        <Image
          src={imgsDir(imgsObject.Hexagon)}
          alt="Manifesto"
          width={400}
          height={416}
        />
      </div>
      <div className={stls.content}>
        <div className={stls.image}>
          <Image src={imgUrl} alt="Manifesto" width={248} height={259} />
        </div>
        <p className={stls.text}>{text}</p>
        <button className={stls.download}>Download</button>
      </div>
    </div>
  );
}
