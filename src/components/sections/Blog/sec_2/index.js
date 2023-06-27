import Container from "src/components/ui/Container";
import Section from "src/components/ui/Section";
import PostBox from "../box";
import { handleAttributes } from "src/tools/const";
import stls from "./index.module.scss";
function Blog_Section_2({ data, locale }) {
  return (
    <Section className={stls.main}>
      <Container className={stls.container}>
        <div
          className={`grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-12 ${stls.grid_1}`}
        >
          {data[0] && (
            <div className="item 2xl:col-span-6">
              <PostBox
                locale={locale}
                data={handleAttributes(data[0])}
                titleClassName={stls.title_1}
              />
            </div>
          )}
          <div className="item 2xl:col-span-6">
            <div className={` ${stls.flex_2}`}>
              {data[1] && (
                <div className="item ">
                  <PostBox
                    locale={locale}
                    boxClassName={stls.box_2}
                    data={handleAttributes(data[1])}
                    imageClassName={stls.image_2}
                    titleClassName={stls.title_2}
                  />
                </div>
              )}
              {data[2] && (
                <>
                  <div className={stls.item}></div>
                  <div className="item ">
                    <PostBox
                      locale={locale}
                      boxClassName={stls.box_2}
                      data={handleAttributes(data[2])}
                      imageClassName={stls.image_2}
                      titleClassName={stls.title_2}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default Blog_Section_2;
