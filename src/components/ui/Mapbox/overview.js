import { imgsObject } from "src/tools/const";
import IconSvg from "../IconSvg";
import stls from "./overview.module.scss";
import FlexBetween from "../Stack/flex-between";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { handleUrl } from "src/redux/sagaUtils";
const fetcher = (...urls) => {
  const f = (url) => fetch(url).then((r) => r.json());
  return Promise.all(urls?.map((url) => f(url)));
};
function OverView({ features }) {
  // const urls = [handleUrl"iots/{}", "/api/v1/magazines/1234/articles"];
  // const { data, error } = useSWR(urls, fetcher);
  // useEffect(() => {}, []);

  return (
    <div
      className={`absolute bg-black bg-opacity-80   top-3 md:top-6 mx-3 md:mx-6 py-3 px-4 rounded-[4px]`}
    >
      <h3 className="text-white text-lg">Dcarbon Overview</h3>
      <FlexBetween
        className={"items-stretch text-opacity-60 text-white text-sm gap-5"}
      >
        <FlexBetween className="items-center gap-4">
          <p>Total number of nodes:</p>
          <span className={stls.overView_totals}>
            <IconSvg img={imgsObject.Hexagon} size={"sm"} />
            {features?.length ?? 0}
          </span>
        </FlexBetween>
        {/* <Divider vertical />
        <div className="flex justify-between items-center gap-4">
          <p>Total carbon offset:</p>
          <span className={stls.overView_totals}>
            <IconSvg img={imgsObject.Recycle} size={"sm"} />
            {featureId ?? 0}
          </span>
        </div> */}
      </FlexBetween>
    </div>
  );
}

export default OverView;
