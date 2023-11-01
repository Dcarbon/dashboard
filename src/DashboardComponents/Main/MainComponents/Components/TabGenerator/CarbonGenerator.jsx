import {
  useCurrentIOTState,
  useGetTotalCarbon,
} from "src/DashboardComponents/handleData";
import BoxTabGenerator from "./Box";

function CarbonGenerator({ isActive, handleClick }) {
  const [currentIot] = useCurrentIOTState();
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
