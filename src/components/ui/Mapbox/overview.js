import { imgsObject } from "src/tools/const";
import IconSvg from "../IconSvg";
import stls from "./overview.module.scss";
import FlexBetween from "../Stack/flex-between";
function OverView({ features }) {
  return (
    <div
      className={`absolute bg-black bg-opacity-80   top-3 md:top-6 mx-3 md:mx-6 py-3 px-4 rounded-[4px]`}
    >
      <h3 className="text-white text-lg"> DCarbon Overview</h3>
      <FlexBetween
        className={"items-stretch text-opacity-60 text-white text-sm gap-5"}
      >
        <FlexBetween className="items-center gap-4">
          <p>Total number of nodes:</p>
          <span className={stls.overView_totals}>
            <IconSvg img={imgsObject.Hexagon} width={24} height={24} />
            {features?.length ?? 0}
          </span>
        </FlexBetween>
      </FlexBetween>
    </div>
  );
}

export default OverView;
