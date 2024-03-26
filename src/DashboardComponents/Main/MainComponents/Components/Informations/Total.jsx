import { useEffect } from "react";
import { getSum } from "src/DashboardComponents/handleConfig";
import {
  useHandleIots_minted,
  useIotState,
  useIots_Minted,
} from "src/hook/useIOT";

function Total() {
  const iotState = useIotState();
  const iots_inside = iotState.iots_by_project;  
  const [getTotal, setTotal] = useIots_Minted();    
  useEffect(() => {    
    if (iots_inside) {           
      setTotal(iots_inside);
    }
  }, [iots_inside, setTotal]);
  const collection = useHandleIots_minted(getTotal);
  const handleTotal = (collection) => {    
    if (collection?.length > 0) {
      let newCollection = collection.reduce((prev, curr) => {
        return {
          ...prev,
          amount: getSum(prev?.amount ?? 0, curr?.amount ?? 0),
        };
      });
      return Number(newCollection.amount ?? 0).toFixed(2);
    }
    return 0;
  };
  return (
    <div className="inline-block border-2 border-primary rounded-full px-5 py-2 mb-6">
      Total carbon credit earned{" "}
      <span className="text-primary text-T-M leading-T-M">
        {/* {projectState.total_project_minted} */}
        {handleTotal(collection)}
      </span>
    </div>
  );
}

export default Total;
