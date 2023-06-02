import Container from "src/components/ui/Container";
import Heading from "src/components/ui/Heading";
import Section from "src/components/ui/Section";
import _HDIW from "src/tools/HDIW_content";
import stls from "./index.module.scss";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
function HdiW_FAQs() {
  const hdiw_data = new _HDIW().Section_3();
  const [showAnswer, setShowAnswer] = useState(-1);
  return (
    <Section className={stls.section}>
      <Container className={stls.container}>
        <Heading className={"text-center text-[#FFFFFF]"} Tag={"h2"}>
          {hdiw_data.heading}
        </Heading>
        <div className={`grid grid-cols-1 md:grid-cols-2 ${stls.faqs}`}>
          {hdiw_data.faqs.map((item, idx) => (
            <div
              key={"hdiw-faq-" + idx}
              className={`${stls.item} ${
                idx === showAnswer ? stls.active : ""
              }`}
            >
              <div className={stls.question}>
                <Heading className={stls.heading} Tag={"h4"} weigth={400}>
                  {item.question}
                </Heading>
                <ChevronDownIcon
                  onClick={() => setShowAnswer(showAnswer === idx ? -1 : idx)}
                  className={stls.btn}
                  width={32}
                  height={32}
                />
              </div>
              <div className={stls.answers}>{item.answers}</div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default HdiW_FAQs;
