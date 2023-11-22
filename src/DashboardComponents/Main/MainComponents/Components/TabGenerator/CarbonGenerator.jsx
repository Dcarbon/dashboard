import { useGetTotalCarbon } from "src/DashboardComponents/handleData";
import BoxTabGenerator from "./Box";
import { useCurrentIOT } from "src/hook/useIOT";

function CarbonGenerator({ isActive, handleClick }) {
  const [currentIot] = useCurrentIOT();
  const total = useGetTotalCarbon(currentIot);

  return (
    <BoxTabGenerator
      title={"Carbon minted"}
      isActive={isActive}
      handleClick={handleClick}
      total={total}
      unit={"carbon"}
    />
  );
}

export default CarbonGenerator;
