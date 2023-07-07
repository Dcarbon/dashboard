import { useRouter } from "next/router";
import { Fragment } from "react";
import Layout from "src/components/layouts";
import ComingSoon from "src/components/layouts/commingSoon";
import Blog_Section_1 from "src/components/sections/Blog/sec_1";
import Blog_Section_2 from "src/components/sections/Blog/sec_2";
import Blog_Section_3 from "src/components/sections/Blog/sec_3";
import Heading from "src/components/ui/Heading";
import useLocale from "src/hook/useLocale";

import { handleAttributes, handleMeta } from "src/tools/const";
import HandleAPI, {
  AxiosGet,
  QStringify,
  handleErr,
} from "src/tools/handleAPI";
import useSWR from "swr";
const fetcherPage = ([url, qstr, locale]) => {
  return AxiosGet(url, qstr, locale);
};

function Blog() {
  const router = useRouter();
  const locale = useLocale();
  const { query } = router;
  const currentPage = query?.page - 1 || 0;
  const skip = query?.search ? 0 : 3;
  const limit = 6;
  let filters = query?.search;
  const newHandleAPI = new HandleAPI();
  // GET  DATA
  // GET  DATA
  // GET  DATA
  // GET  DATA
  // GET  DATA
  // GET  DATA
  // GET  DATA
  // GET  DATA
  let pageQuery = {
    populate: "*",
  };
  let threepostsQuery = newHandleAPI.Get_blog_posts({ start: 0, limit: skip });
  let postsQuery = newHandleAPI.Get_blog_posts({
    start: currentPage * limit + skip,
    limit,
    filters,
  });
  const {
    data: page,
    error: errpage,
    // isLoading: isLoadingPage,
  } = useSWR(
    [newHandleAPI.endppoint.page.blog, QStringify(pageQuery), locale?.current],
    fetcherPage
  );

  const {
    data: threePosts,
    error: errThreePosts,
    // isLoading: isLoadingThreePosts,
  } = useSWR(
    [
      newHandleAPI.endppoint.blog.post,
      QStringify(threepostsQuery),
      locale?.current,
    ],
    fetcherPage
  );
  const {
    data: posts,
    error: errPosts,
    // isLoading: isLoadingPosts,
  } = useSWR(
    [newHandleAPI.endppoint.blog.post, QStringify(postsQuery), locale?.current],
    fetcherPage
  );
  if (errpage) {
    let handleErred = handleErr(errpage);

    if (handleErred?.status === 404) {
      return <ComingSoon />;
    } else {
      return <h1>Lỗi trang</h1>;
    }
  }
  if (errThreePosts) {
    console.error("errThreePosts : --------", handleErr(errThreePosts));
    return <h1>Lỗi lấy 3 bài viết đầu</h1>;
  }
  if (errPosts) {
    console.error("errPosts : --------", handleErr(errPosts));
    return <h1>Lỗi lấy các bài viết</h1>;
  }

  // handle
  // handle
  // handle
  // handle
  // handle
  // handle
  // handle

  return (
    <Layout>
      <Blog_Section_1 data={handleAttributes(page)} />
      {threePosts?.data?.length > 0 ? (
        <Fragment>
          {!filters && !errThreePosts && threePosts?.data && (
            <Blog_Section_2 data={threePosts?.data} />
          )}
          {!errPosts && posts?.data && (
            <Blog_Section_3 data={posts?.data} meta={handleMeta(posts)} />
          )}
        </Fragment>
      ) : (
        <div className="py-12 text-center">
          <Heading Tag={"h1"}>There are no posts yet.</Heading>
        </div>
      )}
    </Layout>
  );
}

export default Blog;
