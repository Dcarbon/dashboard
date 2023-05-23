import ScrollBox from "src/components/ui/ScrollBox";
import CalculateAnnual from "./compo/CalculateAnnual";
import CarbonMinted from "./compo/CarbonMinted";
import InfoProject from "./compo/InfoProject";
import SelectProject from "./compo/SelectProject";
import stls from "./index.module.scss";
function DashboardSideBar() {
  return (
    <ScrollBox disableX>
      <div className="text-[#B3B2B8] p-3 md:p-6">
        <SelectProject />
        <div className={stls.boxMiddle}>
          <InfoProject />
          <CarbonMinted />
        </div>
        <CalculateAnnual />
      </div>
    </ScrollBox>
  );
}

export default DashboardSideBar;
