import { useEffect, useMemo } from "react";
import Layout from "src/components/layouts";
import Post_Sec_2 from "src/components/sections/Post/sec_2";
import Post_Sec_1 from "src/components/sections/Post/sec_1";
import { handleAttributes } from "src/tools/const";
import HandleAPI, { AxiosGet, QStringify } from "src/tools/handleAPI";
import useSWR from "swr";
import { useRouter } from "next/router";
const fetcherPage = ([url, qstr]) => {
  return AxiosGet(url, qstr);
};
function Post() {
  const router = useRouter();
  const { query, locale, defaultLocale } = router;
  const slug = query?.slug;

  const newHandleAPI = new HandleAPI();
  let postQuery = newHandleAPI.Get_blog_post(slug);
  console.log("postQuery", postQuery);
  const {
    data: post,
    error: errPost,
    // isLoading: isLoadingPage,
  } = useSWR(
    [newHandleAPI.endppoint.blog.post, QStringify(postQuery)],
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

  const currentAttrs = useMemo(() => {
    if (locale !== defaultLocale) {
      let newArr = attrs?.localizations?.data;
      let arrByLocal = newArr?.map((item) => handleAttributes(item));
      let newPost = arrByLocal?.find((item) => item?.locale === locale);
      return newPost ?? attrs;
    } else {
      return attrs;
    }
  }, [attrs, defaultLocale, locale]);

  return (
    post && (
      <Layout>
        <Post_Sec_1 title={currentAttrs?.title} />
        <Post_Sec_2
          attrs={currentAttrs}
          defaultLocale={defaultLocale}
          locale={locale}
        />
      </Layout>
    )
  );
}

export default Post;
