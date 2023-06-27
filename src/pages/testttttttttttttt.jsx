import Layout from "src/components/layouts";
import Discover from "src/components/sections/home/discover";
import { handleAttributes } from "src/tools/const";
export default function Testtttttt({ page }) {
  console.log("page", page);
  // check language =
  // GET  DATA
  // GET  DATA

  const attrHome = handleAttributes(page);
  return (
    <Layout>
      <Discover download={attrHome?.download} />
    </Layout>
  );
}
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://10.60.0.58:1337/cms/home?populate=*`);
  const page = await res.json();

  // Pass data to the page via props
  return { props: { page } };
}
