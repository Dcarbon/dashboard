import Layout from "src/components/layouts";
import Contact from "src/components/sections/home/Contact";
import ProductShowcase from "src/components/sections/home/ProductShowcase";
import BannerFisrt from "src/components/sections/home/banner";
import BannerSecond from "src/components/sections/home/banner/bannerSecond";
import Discover from "src/components/sections/home/discover";
import IntroDcarbon from "src/components/sections/home/intro";
import Mechanical from "src/components/sections/home/mechanical";

export default function Home() {
  return (
    <Layout>
      <BannerFisrt />
      <IntroDcarbon />
      <Mechanical />
      <BannerSecond />
      <Discover />
      <ProductShowcase />
      <Contact />
    </Layout>
  );
}
