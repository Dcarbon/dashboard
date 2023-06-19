import Container from "src/components/ui/Container";
import Section from "src/components/ui/Section";
import stls from "./index.module.scss";
import Heading from "src/components/ui/Heading";
import { imgsDir, imgsObject } from "src/tools/const";
import SearchBlog from "./search_blog";
function Blog_Section_1() {
  return (
    <Section className={stls.main} bgImageUrl={imgsDir(imgsObject.blog.banner)}>
      <Container>
        <div className={`relative ${stls.box}`}>
          <Heading Tag={"h1"} className={stls.heading} textGradient>
            See our blog
          </Heading>
          <p className={`${stls.subTitle} text-[#D7D7D9]`}>
            Discover the Future of Carbon Offsetting with Dcarbon: Exploring
            Blockchain and IoT Innovations.
          </p>
          <SearchBlog />
        </div>
      </Container>
    </Section>
  );
}

export default Blog_Section_1;
