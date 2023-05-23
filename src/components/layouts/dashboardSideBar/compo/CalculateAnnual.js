import { useState } from "react";
import BoxSection from "../tools/BoxSection";
import HeadingSideBar from "../tools/Heading";
import stls from "./CalculateAnnual.module.scss";
import FlexBetween from "src/components/ui/Stack/flex-between";
function CalculateAnnual() {
  const [price, setPrice] = useState("");
  return (
    <BoxSection>
      <HeadingSideBar text={"Calculate Annual Return"} />
      <p className="text-[#B3B2B8] mb-3">Dcarbon Devices Price</p>
      <FlexBetween className="items-center mb-3 gap-5">
        <input
          className={`w-full min-w-[212px] ${stls.input} px-4 py-[11px] bg-[#0B0A12] border border-[#32313D] rounded-md`}
          placeholder="Price (USD)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button
          className={`${stls.button} bg-[#72BF44] text-black rounded-[3px] px-7 py-3`}
        >
          Calculate
        </button>
      </FlexBetween>
      <p className="text-[#706E78] text-sm">
        Note: Annual return is based on past performance of this node. This node
        breakeven time is 36 months.
      </p>
    </BoxSection>
  );
}

export default CalculateAnnual;
