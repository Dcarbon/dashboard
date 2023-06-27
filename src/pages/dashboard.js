import DashboardSideBar from "src/components/layouts/dashboardSideBar";
import MapBoxPage from "src/components/ui/Mapbox/mapbox";
import DashboardLayout from "src/components/layouts/iotLayout";
import stls from "./index.module.scss";
import { useState } from "react";
export default function Dashboard() {
  const [iotSelected, setIotSelected] = useState(0);
  const [features, setFeatures] = useState([]);

  return (
    <DashboardLayout>
      <div
        className={`${stls.main} ${features?.length > 0 ? stls.active : ""}`}
      >
        <MapBoxPage
          setFeatures={setFeatures}
          className={stls?.map}
          iotSelected={iotSelected}
          setIotSelected={setIotSelected}
        />
        <DashboardSideBar
          features={features}
          setFeatures={setFeatures}
          className={stls.sidebar}
          iotSelected={iotSelected}
          setIotSelected={setIotSelected}
        />
      </div>
    </DashboardLayout>
  );
}
