import { imgsObject } from "src/tools/const";
import stls from "./overview.module.scss";
import IconSvg from "src/components/ui/IconSvg";
import FlexBetween from "src/components/ui/Stack/flex-between";
import { useCountIot } from "src/hook/useIOT";
function OverView() {
  const count = useCountIot();

  return (
    <div
      className={`absolute bg-black bg-opacity-80   top-3 md:top-6 mx-3 md:mx-6 py-3 px-4 rounded-[4px]`}
    >
      <h3 className='text-white text-lg'> DCarbon Overview</h3>
      <FlexBetween
        className={"items-stretch text-opacity-60 text-white text-sm gap-5"}
      >
        <FlexBetween className='items-center gap-4'>
          <p>Total number of iots:</p>
          <span className={stls.overView_totals}>
            <IconSvg img={imgsObject.Hexagon} width={24} height={24} />
            {count ?? 0}
          </span>
        </FlexBetween>
      </FlexBetween>
    </div>
  );
}

export default OverView;
