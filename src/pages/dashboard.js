import DashboardSideBar from "src/components/layouts/dashboardSideBar";
import MapBoxPage from "src/components/ui/Mapbox/mapbox";
import { useMemo } from "react";
import HookAPI from "src/tools/hook";
import { useSelector } from "react-redux";
import DashboardLayout from "src/components/layouts/iotLayout";
import stls from "./index.module.scss";
import ScrollBox from "src/components/ui/ScrollBox";
export default function Dashboard() {
  const newHook = new HookAPI();
  const customState = useSelector(newHook.GetCustomState);
  const { features } = useMemo(() => customState, [customState]);
  return (
    <DashboardLayout>
      <div
        className={`${stls.main} ${features?.length > 0 ? stls.active : ""}`}
      >
        <MapBoxPage className={stls?.map} />
        <DashboardSideBar className={stls.sidebar} />
      </div>
    </DashboardLayout>
  );
}
