import { useMemo } from "react";
import Layout from "src/components/layouts";
import Post_Sec_2 from "src/components/sections/Post/sec_2";
import Post_Sec_1 from "src/components/sections/Post/sec_1";
import { handleAttributes } from "src/tools/const";
import HandleAPI from "src/tools/handleAPI";

function Blog({ post }) {
  const attrs = useMemo(() => handleAttributes(post?.data[0]), [post?.data]);

  return (
    <Layout>
      <Post_Sec_1 title={attrs?.title} />
      <Post_Sec_2 attrs={attrs} />
    </Layout>
  );
}

export default Blog;
export const getServerSideProps = async (ctx) => {
  const { query } = ctx;
  const slug = query?.slug;

  const newHandleAPI = new HandleAPI();
  const postRES = newHandleAPI.Get_blog_post(slug);
  const post = await postRES;
  if (!slug || !post?.data?.length) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
      props: {},
    };
  }
  return {
    props: {
      post,
    },
  };
};
