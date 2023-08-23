import Container from "src/components/ui/Container";
import Section from "src/components/ui/Section";
import {
  handleAttributes,
  handleImage,
  imgsDir,
  imgsObject,
} from "src/tools/const";
import stls from "./index.module.scss";
import Heading from "src/components/ui/Heading";
import Image from "next/image";
import Link from "next/link";
function Discover({ download }) {
  return (
    <Section
      className={"relative"}
      bgImageUrl={imgsObject.home_banner_discover}
    >
      <Container>
        <div className={stls.box}>
          <div>
            <Image
              className={`${stls.icons} ${stls.icons_left}`}
              src={imgsDir(imgsObject.Polygon_1)}
              alt=''
              width={64}
              height={62}
              style={{
                width: "auto",
                height: "auto",
              }}
            />
            <Image
              className={`${stls.icons} ${stls.icons_middle}`}
              src={imgsDir(imgsObject.Circle)}
              alt=''
              width={85}
              height={85}
              style={{
                width: "auto",
                height: "auto",
              }}
            />
            <Image
              className={`${stls.icons} ${stls.icons_right}`}
              src={imgsDir(imgsObject.Polygon_2)}
              alt=''
              width={114}
              height={123}
              style={{
                width: "auto",
                height: "auto",
              }}
            />
          </div>
          <div className={stls.left}>
            <Heading Tag={"h2"} className={"text-[#FCFCFC] mb-3"}>
              Discover <span className='uppercase'>DCARBON</span>
            </Heading>
            <p className={stls.text}>
              DCarbon is the modern panacea for traditional carbon offsetting
              process.
            </p>
            <p className={stls.text}>
              By using Blockchain and IoT, DCarbon bridges the market
              fragmentation.
            </p>
          </div>

          {download?.length > 0 && (
            <div className={stls.right}>
              <HexagonBox
                file={handleImage(handleAttributes(download[0].files))}
                imgUrl={imgsDir(imgsObject.Manifesto)}
                text={download[0].description}
              />
              <HexagonBox
                file={handleImage(handleAttributes(download[1].files))}
                imgUrl={imgsDir(imgsObject.Whitepaper)}
                text={download[1].description}
              />
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}

export default Discover;
function HexagonBox({ imgUrl, text, file }) {
  return (
    <div className={stls.hexBox}>
      <div className={stls.hexagon}>
        <Image
          src={imgsDir(imgsObject.Hexagon)}
          alt='Manifesto'
          width={400}
          height={416}
        />
      </div>
      <div className={stls.content}>
        <div className={stls.image}>
          <Image src={imgUrl} alt='Manifesto' width={248} height={259} />
        </div>
        <p className={stls.text}>{text}</p>
        <Link href={file} target='_blank' className={stls.download}>
          Download
        </Link>
      </div>
    </div>
  );
}
