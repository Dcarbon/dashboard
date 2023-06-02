import Heading from "src/components/ui/Heading";
import Section from "src/components/ui/Section";
import _HDIW from "src/tools/HDIW_content";
import stls from "./index.module.scss";
function HDI_Banner() {
  const hdiw_data = new _HDIW().Section_1();
  return (
    <Section className={stls.section} bgImageUrl={hdiw_data.banner}>
      <Heading
        Tag={"h3"}
        className={` text-center text-[#FCFCFC] ${stls.heading}`}
      >
        {hdiw_data.text}
      </Heading>
    </Section>
  );
}

export default HDI_Banner;
