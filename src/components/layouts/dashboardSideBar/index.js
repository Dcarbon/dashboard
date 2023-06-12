import ScrollBox from "src/components/ui/ScrollBox";
import CalculateAnnual from "./compo/CalculateAnnual";
import CarbonMinted from "./compo/CarbonMinted";
import InfoProject from "./compo/InfoProject";
import SelectProject from "./compo/SelectProject";
import stls from "./index.module.scss";
import DcarbonAPI from "src/tools/hook";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
function DashboardSideBar({ className }) {
  const newDcarbon = new DcarbonAPI();
  const customState = useSelector(newDcarbon.GetCustomState);
  const [iotSelected, setIotSelected] = useState(0);
  useEffect(() => {
    if (customState?.features?.length > 0) {
      setIotSelected(customState?.features[0]);
    }
  }, [customState?.features]);
  return (
    <div className={className}>
      <ScrollBox disableX>
        <div className="text-[#B3B2B8] p-3 md:p-6">
          <SelectProject
            features={customState?.features}
            iotSelected={iotSelected}
            setIotSelected={setIotSelected}
          />
          <div className={stls.boxMiddle}>
            <InfoProject iotSelected={iotSelected} />
            <CarbonMinted iotSelected={iotSelected} />
          </div>
          {/* <CalculateAnnual iotSelected={iotSelected} /> */}
        </div>
      </ScrollBox>
    </div>
  );
}

export default DashboardSideBar;
