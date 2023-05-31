import Container from "src/components/ui/Container";
import Heading from "src/components/ui/Heading";
import Section from "src/components/ui/Section";
import MyGlide from "./MyGlide";
import stls from "./index.module.scss";
function ProductShowcase() {
  return (
    <Section className={stls.section}>
      <Container>
        <div className="text-center">
          <Heading className={"mb-7 lg:mb-10"} Tag={"h2"} textGradient>
            Product Showcase
          </Heading>
        </div>
        <MyGlide />
      </Container>
    </Section>
  );
}

export default ProductShowcase;
