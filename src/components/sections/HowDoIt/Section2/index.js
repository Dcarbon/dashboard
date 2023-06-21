import HTMLReactParser from "html-react-parser";
import Image from "next/image";
import Container from "src/components/ui/Container";
import Section from "src/components/ui/Section";
import stls from "./index.module.scss";
import { imgsDir, imgsObject } from "src/tools/const";
import CommonBox from "../../commonBox";
import _HDIW from "src/tools/howdoesitwork_content";
function HDIWSection2() {
  const hdiw_data = new _HDIW().Section_2();
  return (
    <Section className={stls.section}>
      <Container className={stls.container}>
        <CommonBox>
          <div className={stls.box}>
            <div className={stls.flyIcon}>
              <Image
                className={`${stls.fly} ${stls.fly_1}`}
                src={imgsDir(imgsObject.Circle)}
                alt=""
                width={42}
                height={42}
              />
              <Image
                className={`${stls.fly} ${stls.fly_2}`}
                src={imgsDir(imgsObject.Circle)}
                alt=""
                width={70}
                height={70}
              />
              <Image
                className={`${stls.fly} ${stls.fly_3}`}
                src={imgsDir(imgsObject.Polygon_1)}
                alt=""
                width={64}
                height={64}
              />
              <Image
                className={`${stls.fly} ${stls.fly_4}`}
                src={imgsDir(imgsObject.Polygon_2)}
                alt=""
                width={84}
                height={84}
              />
              <Image
                className={`${stls.fly} ${stls.fly_5}`}
                src={imgsDir(imgsObject.Cube)}
                alt=""
                width={80}
                height={80}
              />
            </div>
            {hdiw_data?.map((item, idx) => (
              <div
                key={"hdiw" + idx}
                className={`flex flex-col md:flex-row ${stls.widget} ${
                  idx % 2 !== 0 ? stls.flip : ""
                }`}
              >
                <div className={stls.content}>
                  {HTMLReactParser(item.content)}
                </div>
                <div className={stls.image}>
                  {
                    <Image
                      src={item.imgs}
                      alt="how does it work"
                      width={324}
                      height={324}
                    />
                  }
                </div>
              </div>
            ))}
          </div>
        </CommonBox>
      </Container>
    </Section>
  );
}

export default HDIWSection2;
