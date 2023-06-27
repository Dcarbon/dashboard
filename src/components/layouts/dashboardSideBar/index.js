import ScrollBox from "src/components/ui/ScrollBox";
import stls from "./index.module.scss";
import { Fragment, useState } from "react";
import InfoProject from "src/components/sections/Dashboard/InforProject";
import CarbonGenerated from "src/components/sections/Dashboard/Generated/carbon";
import CollapseTab from "src/components/sections/Dashboard/CollapseTab";
import SelectIOT from "src/components/sections/Dashboard/SelectIOT";
import ElectricityGenerated from "src/components/sections/Dashboard/Generated/electricity";
function DashboardSideBar({
  features,
  className,
  iotSelected,
  setIotSelected,
}) {
  const [currentTab, setCurrentTab] = useState(1);

  return (
    <div className={className}>
      <ScrollBox disableX>
        <div className="text-[#B3B2B8]">
          <SelectIOT
            features={features}
            iotSelected={iotSelected}
            setIotSelected={setIotSelected}
          />
          {iotSelected > 0 && (
            <Fragment>
              <div className={stls.boxMiddle}>
                {iotSelected && (
                  <CollapseTab disable color="blue" title="Info project">
                    <InfoProject />
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
            </Fragment>
          )}
        </div>
      </ScrollBox>
    </div>
  );
}

export default DashboardSideBar;
