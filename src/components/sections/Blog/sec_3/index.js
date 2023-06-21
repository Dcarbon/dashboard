import Container from "src/components/ui/Container";
import Section from "src/components/ui/Section";
import PostBox from "../box";
import { handleAttributes } from "src/tools/const";
import stls from "./index.module.scss";
import { useRouter } from "next/router";
import { useMemo } from "react";
import Pagination from "rc-pagination";
import Link from "next/link";
import QueryString from "qs";
function Blog_Section_3({ data, meta }) {
  const router = useRouter();
  const pagination = useMemo(() => meta?.pagination, [meta?.pagination]);
  return (
    <Section className={stls.main}>
      <Container className={stls.container}>
        <div className={`grid grid-cols-2 xl:grid-cols-3 ${stls.grid_1}`}>
          {data?.map((item) => (
            <div key={"posts=" + item?.id} className="item">
              <PostBox
                data={handleAttributes(item)}
                titleClassName={stls.title}
                summaryClassName={stls.summary}
                imageClassName={stls.image}
              />
            </div>
          ))}
        </div>
        <div className={stls.pagination}>
          <Pagination
            hideOnSinglePage
            pageSize={pagination?.limit}
            total={pagination?.total - 3} //cause  skip 3
            totalBoundaryShowSizeChanger={4}
            itemRender={(page, type) => {
              const strQue = QueryString.stringify(
                router.query?.search
                  ? {
                      page,
                      search: router.query?.search,
                    }
                  : {
                      page,
                    }
              );
              if (type === "page") {
                let check = Number(page) === Number(router?.query?.page || 1);
                return (
                  <Link
                    className={check ? stls.active : ""}
                    href={router?.pathname + "?" + strQue}
                    scroll={false}
                  >
                    {page}
                  </Link>
                );
              } else if (type === "jump-next" || type === "jump-prev") {
                <Link href={router?.pathname + "?" + strQue} scroll={false}>
                  {"..."}
                </Link>;
              } else {
                return <></>;
              }
            }}
          />
        </div>
      </Container>
    </Section>
  );
}

export default Blog_Section_3;
