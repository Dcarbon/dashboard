import { useMemo } from "react";
import Layout from "src/components/layouts";
import Post_Sec_2 from "src/components/sections/Post/sec_2";
import Post_Sec_1 from "src/components/sections/Post/sec_1";
import { handleAttributes } from "src/tools/const";
import HandleAPI, { AxiosGet, QStringify } from "src/tools/handleAPI";
import useSWR from "swr";
import { useRouter } from "next/router";
const fetcherPage = ([url, qstr, locale]) => {
  return AxiosGet(url, qstr, locale);
};
function Post() {
  const router = useRouter();
  const { query, locale, defaultLocale } = router;
  const slug = query?.slug;
  const newHandleAPI = new HandleAPI();
  let postQuery = newHandleAPI.Get_blog_post(slug);
  const { data: post, error: errPost } = useSWR(
    [newHandleAPI.endppoint.blog.post, QStringify(postQuery), locale],
    fetcherPage
  );

  // handle
  // handle
  // handle
  // handle
  // handle

  const attrs = useMemo(() => handleAttributes(post?.data[0]), [post?.data]);
  if (errPost) {
    router.push("/404");
  }

  return (
    post && (
      <Layout>
        <Post_Sec_1 title={attrs?.title} />

        <Post_Sec_2
          attrs={attrs}
          defaultLocale={defaultLocale}
          locale={locale}
        />
      </Layout>
    )
  );
}

export default Post;
