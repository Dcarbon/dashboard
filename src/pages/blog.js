import { useRouter } from "next/router";
import Layout from "src/components/layouts";
import ComingSoon from "src/components/layouts/commingSoon";
import Blog_Section_1 from "src/components/sections/Blog/sec_1";
import Blog_Section_2 from "src/components/sections/Blog/sec_2";
import Blog_Section_3 from "src/components/sections/Blog/sec_3";

import { handleAttributes, handleMeta } from "src/tools/const";
import HandleAPI, { AxiosGet, QStringify } from "src/tools/handleAPI";
import useSWR from "swr";
const fetcherPage = ([url, qstr]) => {
  return AxiosGet(url, qstr);
};

function Blog() {
  const router = useRouter();
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
    [newHandleAPI.endppoint.page.blog, QStringify(pageQuery)],
    fetcherPage
  );

  const {
    data: threePosts,
    error: errThreePosts,
    // isLoading: isLoadingThreePosts,
  } = useSWR(
    [newHandleAPI.endppoint.blog.post, QStringify(threepostsQuery)],
    fetcherPage
  );
  const {
    data: posts,
    error: errPosts,
    // isLoading: isLoadingPosts,
  } = useSWR(
    [newHandleAPI.endppoint.blog.post, QStringify(postsQuery)],
    fetcherPage
  );
  if (errpage) {
    console.error("errpage : --------", errpage);
  }
  if (errThreePosts) {
    console.error("errThreePosts : --------", errThreePosts);
  }
  if (errPosts) {
    console.error("errPosts : --------", errPosts);
  }

  // handle
  // handle
  // handle
  // handle
  // handle
  // handle
  // handle

  if (errpage) {
    return <ComingSoon />;
  }

  return (
    <Layout>
      <Blog_Section_1 data={handleAttributes(page)} />
      {!filters && !errThreePosts && threePosts && (
        <Blog_Section_2 data={threePosts?.data} />
      )}
      {!errPosts && posts && (
        <Blog_Section_3 data={posts?.data} meta={handleMeta(posts)} />
      )}
    </Layout>
  );
}

export default Blog;
