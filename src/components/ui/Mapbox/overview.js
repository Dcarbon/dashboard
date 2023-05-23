import { imgsObject } from "src/tools/const";
import IconSvg from "../IconSvg";
import Divider from "../divider";
import stls from "./overview.module.scss";
function OverView({ featureId }) {
  // useEffect(() => {
  //   console.log("customState", customState.idFeature);
  // }, [customState.idFeature]);

  return (
    <div
      className={`absolute bg-black bg-opacity-80   top-3 md:top-6 mx-3 md:mx-6 py-3 px-4 rounded-[4px]`}
    >
      <h3 className="text-white text-lg">Dcarbon Overview</h3>
      <div className="flex justify-between items-stretch text-opacity-60 text-white text-sm gap-5">
        <div className="flex justify-between items-center gap-4">
          <p>Total number of nodes:</p>
          <span className={stls.overView_totals}>
            <IconSvg img={imgsObject.Hexagon} size={"sm"} />
            {featureId ?? 0}
          </span>
        </div>
        <Divider vertical />
        <div className="flex justify-between items-center gap-4">
          <p>Total carbon offset:</p>
          <span className={stls.overView_totals}>
            <IconSvg img={imgsObject.Recycle} size={"sm"} />
            {featureId ?? 0}
          </span>
        </div>
      </div>
    </div>
  );
}

export default OverView;
