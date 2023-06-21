import Layout from "src/components/layouts";
import Contact from "src/components/sections/home/Contact";
import ProductShowcase from "src/components/sections/home/ProductShowcase";
import BannerFisrt from "src/components/sections/home/banner";
import BannerSecond from "src/components/sections/home/banner/bannerSecond";
import Discover from "src/components/sections/home/discover";
import IntroDcarbon from "src/components/sections/home/intro";
import Mechanical from "src/components/sections/home/mechanical";
import { handleAttributes } from "src/tools/const";
import HandleAPI from "src/tools/handleAPI";

export default function Home({ pageHome }) {
  const attrHome = handleAttributes(pageHome);
  return (
    <Layout>
      <BannerFisrt />
      <IntroDcarbon />
      <Mechanical />
      <BannerSecond />
      <Discover download={attrHome?.download} />
      <ProductShowcase />
      <Contact />
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const newHandleAPI = new HandleAPI();
  const pageHomeRES = newHandleAPI.Get_page_home();

  const pageHome = (await pageHomeRES) || null;
  if (!pageHome?.data) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
      props: {},
    };
  }
  return {
    props: {
      pageHome,
    },
  };
};
