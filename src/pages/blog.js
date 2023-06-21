import { useRouter } from "next/router";
import Layout from "src/components/layouts";
import ComingSoon from "src/components/layouts/commingSoon";
import Blog_Section_1 from "src/components/sections/Blog/sec_1";
import Blog_Section_2 from "src/components/sections/Blog/sec_2";
import Blog_Section_3 from "src/components/sections/Blog/sec_3";
import { handleAttributes, handleMeta } from "src/tools/const";
import HandleAPI from "src/tools/handleAPI";

function Blog({ threePosts, posts, pageBlog }) {
  const router = useRouter();

  if (pageBlog?.failed === true) {
    return <ComingSoon />;
  }

  return (
    <Layout>
      <Blog_Section_1 data={handleAttributes(pageBlog)} />
      {!router.query?.search && threePosts && (
        <Blog_Section_2 data={threePosts?.data} />
      )}
      {posts && <Blog_Section_3 data={posts?.data} meta={handleMeta(posts)} />}
    </Layout>
  );
}

export default Blog;
export const getServerSideProps = async (ctx) => {
  const { query } = ctx;
  const currentPage = query?.page - 1 || 0;
  const skip = query?.search ? 0 : 3;
  const limit = 6;
  const newHandleAPI = new HandleAPI();
  const pageBlogRES = newHandleAPI.Get_page_blog();
  const threePostsRES = newHandleAPI.Get_blog_posts({
    start: 0,
    limit: skip,
  });
  let filters = query?.search;
  const postsRES = newHandleAPI.Get_blog_posts({
    start: currentPage * limit + skip,
    limit,
    filters,
  });
  const pageBlog = (await pageBlogRES) || null;
  if (!pageBlog?.data) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
      props: {},
    };
  }
  const threePosts = (await threePostsRES) || null;
  const posts = (await postsRES) || null;
  return {
    props: {
      posts,
      threePosts,
      pageBlog,
    },
  };
};
