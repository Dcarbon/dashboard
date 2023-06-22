import axios from "axios";
import QueryString from "qs";
import { CMS_HOST } from "src/redux/handle";
export const QStringify = (obj) => {
  return QueryString.stringify(obj, { encodeValuesOnly: true });
};
const handleErr = (error) => {
  console.error("Error from ", error?.config?.url);
  return {
    failed: true,
    data: error?.response?.data?.error,
  };
};

// const AxiosGet = async (endpoint, objQuery) => {
//   let queryString = QStringify(objQuery);
//   try {
//     // let strAPI = `${cms_api}${endpoint}?${queryString}`;
//     let strAPI = `${CMS_HOST + "/cms/"}${endpoint}?${queryString}`;
//     let res = await axios.get(strAPI);
//     console.log(
//       "--------------" + `${CMS_HOST + "/cms/"}${endpoint}?${queryString}`
//     );
//     return res.data;
//   } catch (error) {
//     return handleErr(error);
//   }
// };
export const AxiosGet = async (endpoint, queryString) => {
  try {
    // let strAPI = `${cms_api}${endpoint}?${queryString}`;
    let strAPI = `${CMS_HOST + "/cms/"}${endpoint}?${queryString}`;
    let res = await axios.get(strAPI);
    // console.log(
    //   "--------------" + `${CMS_HOST + "/cms/"}${endpoint}?${queryString}`
    // );
    return res.data;
  } catch (error) {
    return handleErr(error);
  }
};
class HandleAPI {
  endppoint = {
    page: {
      blog: "blog",
      home: "home",
    },
    blog: {
      category: "blog-categories",
      post: "blog-posts",
    },
  };

  Get_page_home() {
    let objQuery = {
      populate: {
        download: {
          populate: "*",
        },
      },
    };
    return objQuery;
    // return AxiosGet(this.endppoint.page.home, objQuery);
  }
  Get_page_blog() {
    let objQuery = {
      populate: "*",
    };
    return objQuery;
    // return AxiosGet(this.endppoint.page.blog, objQuery);
  }
  Get_blog_categories(id) {
    let objQuery = {
      populate: "*",
    };
    return AxiosGet(
      `${this.endppoint.blog.category}${id ? "/" + id : ""}`,
      objQuery
    );
  }
  Get_blog_posts({ start, limit, withCount, filters }) {
    let objQuery = {
      populate: "*",
      sort: ["createdAt:desc"],
      pagination: {
        start: start || 0,
        limit: limit || 25,
        withCount,
      },
      filters: {
        $or: [
          {
            title: {
              $containsi: filters,
            },
          },
          {
            summary: {
              $containsi: filters,
            },
          },
        ],
      },
    };
    return objQuery;
    // return AxiosGet(`${this.endppoint.blog.post}`, objQuery);
  }
  Get_blog_post(slug) {
    let objQuery = {
      populate: "*",
      filters: {
        slug: {
          $eq: slug,
        },
      },
    };
    return objQuery;
    // return AxiosGet(`${this.endppoint.blog.post}`, objQuery);
  }
}
export default HandleAPI;
