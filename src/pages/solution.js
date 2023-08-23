import Layout from "src/components/layouts";
import SolutionSection_1 from "src/components/sections/Solutions/Section1";
import SolutionSection_2 from "src/components/sections/Solutions/Section2";

function Solution() {
  return (
    <Layout title={"Solutions"}>
      <SolutionSection_1 />
      <SolutionSection_2 />
    </Layout>
  );
}

export default Solution;
