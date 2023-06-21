import Link from "next/link";
import stls from "./index.module.scss";
import Section from "src/components/ui/Section";
import Container from "src/components/ui/Container";
function Post_Sec_1({ title }) {
  return (
    <Section className={stls.main}>
      <Container className={stls.container}>
        <ul className={stls.list}>
          <li>
            <Link href={"/blog"}>
              <p className="text-white">
                All blog<span>{">"}</span>
              </p>
            </Link>
          </li>
          <li>
            <p>{title}</p>
          </li>
        </ul>
      </Container>
    </Section>
  );
}

export default Post_Sec_1;
