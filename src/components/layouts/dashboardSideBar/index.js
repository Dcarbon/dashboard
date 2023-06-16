import ScrollBox from "src/components/ui/ScrollBox";
import stls from "./index.module.scss";
import DcarbonAPI from "src/tools/hook";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import InfoProject from "src/components/sections/Dashboard/InforProject";
import CarbonGenerated from "src/components/sections/Dashboard/Generated/carbon";
import CollapseTab from "src/components/sections/Dashboard/CollapseTab";
import SelectProject from "src/components/sections/Dashboard/SelectProject";
import ElectricityGenerated from "src/components/sections/Dashboard/Generated/electricity";
function DashboardSideBar({ className }) {
  const newDcarbon = new DcarbonAPI();
  const customState = useSelector(newDcarbon.GetCustomState);
  const [iotSelected, setIotSelected] = useState(0);
  useEffect(() => {
    if (customState?.features?.length > 0) {
      setIotSelected(customState?.features[0]);
    }
  }, [customState?.features]);
  const [currentTab, setCurrentTab] = useState(1);
  return (
    <div className={className}>
      <ScrollBox disableX>
        <div className="text-[#B3B2B8]">
          <SelectProject
            features={customState?.features}
            iotSelected={iotSelected}
            setIotSelected={setIotSelected}
          />
          <div className={stls.boxMiddle}>
            {iotSelected && (
              <CollapseTab disable color="blue" title="Info project">
                <InfoProject iotSelected={iotSelected} />
              </CollapseTab>
            )}

            <CarbonGenerated
              iotSelected={iotSelected}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
            />

            <ElectricityGenerated
              iotSelected={iotSelected}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
            />
          </div>
        </div>
      </ScrollBox>
    </div>
  );
}

export default DashboardSideBar;
