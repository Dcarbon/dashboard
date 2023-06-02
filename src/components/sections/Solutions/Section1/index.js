import Heading from "src/components/ui/Heading";
import Section from "src/components/ui/Section";
import stls from "./index.module.scss";
import _Solution from "src/tools/Solution_content";

function SolutionSection_1({}) {
  const solution_data = new _Solution().Section_1();
  return (
    <Section className={stls.section}>
      <Heading Tag={"h3"} className={stls.heading}>
        {solution_data.text}
      </Heading>
    </Section>
  );
}

export default SolutionSection_1;
