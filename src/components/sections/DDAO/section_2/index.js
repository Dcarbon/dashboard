import Container from "src/components/ui/Container";
import CommonBox from "../../commonBox";
import Section from "src/components/ui/Section";
import FlexBetween from "src/components/ui/Stack/flex-between";
import stls from "./index.module.scss";
import _DDAO from "src/tools/DDAO_content";
import Image from "next/image";
import Heading from "src/components/ui/Heading";
import HTMLReactParser from "html-react-parser";
function Section_2() {
  const ddao_data = new _DDAO().Section_2();
  return (
    <Section className={stls.section}>
      <Container className={stls.container}>
        <CommonBox className={stls.bigBox}>
          <FlexBetween className={"flex-wrap"}>
            <SmallBox
              className={stls.vision}
              data={ddao_data.vision}
              width={341}
              height={353}
            />
            <SmallBox
              className={stls.goal}
              data={ddao_data.goal}
              width={171}
              height={171}
            />
            <SmallBox
              className={stls.foundation}
              data={ddao_data.foundation}
              width={145}
              height={145}
            />
          </FlexBetween>
        </CommonBox>
      </Container>
    </Section>
  );
}

export default Section_2;
function SmallBox({ className, data, width, height }) {
  return (
    <CommonBox className={`${stls.smallBox} ${className ?? ""}`}>
      <div className={stls.thumbnail}>
        <Image
          src={data?.thumbnail}
          alt={data?.title}
          width={width}
          height={height}
        />
      </div>
      <div className={stls.body}>
        <Heading Tag={"h2"} className={stls.title}>
          {data?.title}
        </Heading>
        <div className={stls.content}>{HTMLReactParser(data?.body ?? "")}</div>
      </div>
    </CommonBox>
  );
}
