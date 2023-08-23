import Container from "src/components/ui/Container";
import Section from "src/components/ui/Section";
import stls from "./index.module.scss";
import Heading from "src/components/ui/Heading";
import { imgsObject } from "src/tools/const";
import SearchBlog from "./search_blog";
function Blog_Section_1({ data }) {
  return (
    <Section
      className={"relative " + stls.main}
      bgImageUrl={imgsObject.blog.banner}
    >
      <Container>
        <div className={`relative ${stls.box}`}>
          <Heading Tag={"h1"} className={stls.heading} textGradient>
            {data?.heading}
          </Heading>
          <p className={`${stls.subTitle} text-[#D7D7D9]`}>
            {data?.subHeading}
          </p>
          <SearchBlog />
        </div>
      </Container>
    </Section>
  );
}

export default Blog_Section_1;
