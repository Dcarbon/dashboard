import Layout from "src/components/layouts";
import ComingSoon from "src/components/layouts/commingSoon";
import Contact from "src/components/sections/home/Contact";
import ProductShowcase from "src/components/sections/home/ProductShowcase";
import BannerFisrt from "src/components/sections/home/banner";
import BannerSecond from "src/components/sections/home/banner/bannerSecond";
import Discover from "src/components/sections/home/discover";
import IntroDcarbon from "src/components/sections/home/intro";
import Mechanical from "src/components/sections/home/mechanical";
import useLocale from "src/hook/useLocale";
import { handleAttributes } from "src/tools/const";
import HandleAPI, {
  AxiosGet,
  QStringify,
  handleErr,
} from "src/tools/handleAPI";
import useSWR from "swr";
const fetcherPage = ([url, qstr, locale]) => {
  return AxiosGet(url, qstr, locale);
};
export default function Home() {
  // check language =
  const newHandleAPI = new HandleAPI();
  // GET  DATA
  // GET  DATA
  // GET  DATA
  // GET  DATA
  // GET  DATA
  // GET  DATA
  // GET  DATA
  // GET  DATA
  let pageQuery = newHandleAPI.Get_page_home();
  const locale = useLocale();
  const {
    data: page,
    error: errpage,
    // isLoading: isLoadingPage,
  } = useSWR(
    [newHandleAPI.endppoint.page.home, QStringify(pageQuery), locale?.current],
    fetcherPage
  );
  if (errpage) {
    let handleErred = handleErr(errpage);

    if (handleErred?.status === 404) {
      return <ComingSoon />;
    } else {
      return <h1>Lỗi trang : ---- {JSON.stringify(handleErred)}</h1>;
    }
  }

  const attrHome = handleAttributes(page);

  return (
    <Layout title={"Home page"}>
      <BannerFisrt />
      <IntroDcarbon />
      <Mechanical />
      <BannerSecond />
      <Discover download={attrHome?.download} />
      <ProductShowcase />
      <Contact />
    </Layout>
  );
}
