import ScrollBox from "src/components/ui/ScrollBox";
import stls from "./index.module.scss";
import { Fragment } from "react";
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
  return (
    <div className={className}>
      <ScrollBox disableX>
        <div className="text-[#B3B2B8]">
          <SelectIOT
            features={features}
            iotSelected={iotSelected}
            setIotSelected={setIotSelected}
          />

          <Fragment>
            <div className={stls.boxMiddle}>
              {iotSelected && (
                <CollapseTab disable color="blue" title="Info project">
                  <InfoProject />
                </CollapseTab>
              )}
              {/* Chart  */}
              {/* Chart  */}
              {/* Chart  */}
              <CarbonGenerated iotSelected={iotSelected} />
              {/* electric and biogas */}
              {/* electric and biogas */}
              {/* electric and biogas */}
              {/* electric and biogas */}
              <ElectricityGenerated iotSelected={iotSelected} />
            </div>
          </Fragment>
        </div>
      </ScrollBox>
    </div>
  );
}

export default DashboardSideBar;
