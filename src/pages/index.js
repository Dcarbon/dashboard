import Layout from "src/components/layouts";
import DashboardSideBar from "src/components/layouts/dashboardSideBar";
import MapBoxPage from "src/components/ui/Mapbox/mapbox";
import stls from "./index.module.scss";
export default function Home() {
  return (
    <Layout>
      <div className={`${stls.main} block md:flex`}>
        <div className='bg-[#181818] w-full h-2/3 md:h-full'>
          <MapBoxPage />
        </div>
        <DashboardSideBar />
      </div>
    </Layout>
  );
}
