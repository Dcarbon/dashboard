import Layout from "src/components/layouts";
import HDI_Banner from "src/components/sections/HowDoIt/Banner";
import HDIWSection2 from "src/components/sections/HowDoIt/Section2";
import HdiW_FAQs from "src/components/sections/HowDoIt/Section3";

function HowDoIt() {
  return (
    <Layout title={"How does it work?"}>
      <HDI_Banner />
      <HDIWSection2 />
      <HdiW_FAQs />
    </Layout>
  );
}

export default HowDoIt;
