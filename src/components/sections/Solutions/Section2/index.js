import { useState } from "react";
import Container from "src/components/ui/Container";
import Heading from "src/components/ui/Heading";
import Section from "src/components/ui/Section";
import _Solution from "src/tools/Solution_content";
import stls from "./index.module.scss";
import CommonBox from "../../commonBox";
import Image from "next/image";
import HTMLReactParser from "html-react-parser";
import FlexBetween from "src/components/ui/Stack/flex-between";
import { imgsDir, imgsObject } from "src/tools/const";
function SolutionSection_2() {
  const solution_data = new _Solution().Section_2();
  const [currentTab, setCurrentTab] = useState(0);
  return (
    <Section>
      <Container>
        <CommonBox>
          <div className={stls.box}>
            <div className={stls.left}>
              <ul className={stls.nav_tabs}>
                {solution_data?.map((item, idx) => (
                  <li
                    key={"idx-" + item.tab_id}
                    className={`${stls.item} ${
                      currentTab === idx ? stls.active : ""
                    }`}
                    onClick={() => setCurrentTab(idx)}
                  >
                    {item.tab_name}
                  </li>
                ))}
              </ul>
            </div>
            <div className={stls.right}>
              <TabContent content={solution_data[currentTab]} />
            </div>
          </div>
        </CommonBox>
      </Container>
    </Section>
  );
}

export default SolutionSection_2;

function TabContent({ content }) {
  return (
    <div>
      <Heading Tag={"h3"} textGradient>
        {content.tab_name}
      </Heading>
      <FlexBetween className={`flex-col xl:flex-row ${stls.content_tab}`}>
        <div className={`${stls.image} relative`}>
          <Image
            src={content.tab_img}
            alt=''
            width={1200}
            height={300}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className={stls.body}>
          <div
            className={stls.earth}
            style={{ backgroundImage: `url(${imgsDir(imgsObject.Earth)})` }}
          ></div>
          {HTMLReactParser(content.tab_content)}
        </div>
      </FlexBetween>
    </div>
  );
}
