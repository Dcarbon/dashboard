import DashboardSideBar from "src/components/layouts/dashboardSideBar";
import MapBoxPage from "src/components/ui/Mapbox/mapbox";
import DashboardLayout from "src/components/layouts/iotLayout";
import stls from "../styles/index.module.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { SensorsACT } from "src/redux/actions/sensorsAction";
export default function Dashboard() {
  const [iotSelected, setIotSelected] = useState(0);
  const [features, setFeatures] = useState([]);
  const [errFlyTo, setErrFlyTo] = useState(false);
  const [mymap, setMymap] = useState(null);
  const dispatch = useDispatch();
  const handleClearSensor = () => dispatch({ type: SensorsACT.CLEAR_SENSOR });
  const handlesetIotSelected = (id) => {
    handleClearSensor();
    setIotSelected(id);
  };
  return (
    <DashboardLayout
      setErrFlyTo={setErrFlyTo}
      mymap={mymap}
      iotSelected={iotSelected}
      setIotSelected={handlesetIotSelected}
      setFeatures={setFeatures}
    >
      <div
        className={`${stls.main} ${features?.length > 0 ? stls.active : ""}`}
      >
        {/* Map */}
        {/* - hiển thị thông tin tổng số  generator (iot) */}
        {/* - hiển thị vị trí node trên bản đồ , mỗi node sẽ có các iot*/}
        {/* - click node -> get iot -> gán vào iotSelected, features (generators)  */}
        <MapBoxPage
          errFlyTo={errFlyTo}
          setErrFlyTo={setErrFlyTo}
          mymap={mymap}
          setMymap={setMymap}
          setFeatures={setFeatures}
          className={stls?.map}
          iotSelected={iotSelected}
          setIotSelected={handlesetIotSelected}
        />

        {/* Side */}
        {/* - Liệt kê generators */}
        {/* - hiển thị vị trí node trên bản đồ */}
        {/* - click node -> get iot -> gán vào iotSelected, features (generators)  */}
        {/* - khi có iot :  */}
        {/* ------------ find project => info project (nếu có mảng trả về và thời gian số liệu cách hiện tại 5s => đang hoạt đông ) */}
        {/* ------------ biểu đồ  */}
        {/* ------------ power nếu type === 1 && thời gian phù hợp */}
        {/* ------------ nếu có number power * số liệu đã cho */}
        <DashboardSideBar
          features={features}
          setFeatures={setFeatures}
          className={stls.sidebar}
          iotSelected={iotSelected}
          setIotSelected={handlesetIotSelected}
        />
      </div>
    </DashboardLayout>
  );
}
