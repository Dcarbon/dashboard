import ScrollBox from "src/components/ui/ScrollBox";
import CalculateAnnual from "./compo/CalculateAnnual";
import CarbonMinted from "./compo/CarbonMinted";
import InfoProject from "./compo/InfoProject";
import SelectProject from "./compo/SelectProject";
import stls from "./index.module.scss";
function DashboardSideBar() {
  return (
    <ScrollBox
      disableX
      className={`${stls.dashboard} bg-[#181818] w-full md:w-[420px]`}
    >
      <div className="text-[#B3B2B8] p-3 md:p-6">
        <SelectProject />
        <InfoProject />
        <CarbonMinted />
        <CalculateAnnual />
      </div>
    </ScrollBox>
  );
}

export default DashboardSideBar;
