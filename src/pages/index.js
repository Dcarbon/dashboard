import Layout from "src/components/layouts";
import DashboardSideBar from "src/components/layouts/dashboardSideBar";
import MapBoxPage from "src/components/ui/Mapbox/mapbox";

export default function Home() {
  return (
    <Layout>
      <div className='flex '>
        <div className='flex-grow'>
          <MapBoxPage />
        </div>
        <DashboardSideBar />
      </div>
    </Layout>
  );
}
