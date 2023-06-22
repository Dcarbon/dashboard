import stls from "./index.module.scss";
import Section from "src/components/ui/Section";
import Container from "src/components/ui/Container";
import Heading from "src/components/ui/Heading";
import { handleAttributes, handleImage } from "src/tools/const";
import { useMemo } from "react";
import dateFormat from "dateformat";
import Image from "next/image";
import Markdown from "markdown-to-jsx";
function Post_Sec_2({ attrs }) {
  const dateCreate = useMemo(
    () => dateFormat(new Date(attrs?.createdAt), "mmm dd, yyyy"),
    [attrs?.createdAt]
  );
  const attrImg = handleAttributes(attrs?.thumbnail);
  return (
    <Section className={stls.main}>
      <Container className={stls.container}>
        <div>
          <div className={stls.content}>
            {attrs?.blog_category && (
              <Heading Tag={"h5"} className={stls.tag}>
                {handleAttributes(attrs?.blog_category)?.title}
              </Heading>
            )}
            <Heading Tag={"h3"} className={stls.title}>
              {attrs?.title}
            </Heading>
            <p className={stls.date}>{dateCreate}</p>
          </div>
          {attrImg && (
            <div className={stls.image}>
              <Image
                unoptimized
                src={handleImage(attrImg)}
                alt={attrImg?.alternativeText ?? ""}
                width={1000}
                height={1000}
                style={{
                  width: "auto",
                  height: "auto",
                }}
              />
            </div>
          )}

          <div className={stls.body}>
            {attrs?.body && (
              <Markdown
                options={{
                  overrides: {
                    img: (attrImg2) => {
                      return (
                        <Image
                          unoptimized
                          src={handleImage(attrImg2)}
                          alt={attrImg2?.alt ?? ""}
                          width={1440}
                          height={0}
                          style={{
                            width: "auto",
                            height: "auto",
                          }}
                        />
                      );
                    },
                  },
                }}
              >
                {attrs?.body}
              </Markdown>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default Post_Sec_2;
