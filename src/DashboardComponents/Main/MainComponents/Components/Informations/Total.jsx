import { useEffect, useMemo } from "react";
import { getAmount } from "src/DashboardComponents/handleConfig";
import {
  useGetTotalIot_byProject,
  useGet_Total_Project_Minted,
  useIOTState,
  useProjectInformation,
} from "src/DashboardComponents/handleData";

function Total() {
  const iotState = useIOTState();
  const projectId = useMemo(
    () => iotState?.iot?.project,
    [iotState?.iot?.project]
  );
  useProjectInformation(projectId);
  const iots_by_project = useGetTotalIot_byProject(projectId);

  const listIotId = useMemo(
    () => iots_by_project?.map((item) => item?.id),
    [iots_by_project]
  );
  const [projectTotal, handleGetProjectTotal] = useGet_Total_Project_Minted();

  useEffect(() => {
    if (listIotId && projectTotal === undefined) {
      handleGetProjectTotal(listIotId);
    }
  }, [handleGetProjectTotal, listIotId, projectTotal]);

  const handleTotalCarbon = (arr = []) => {
    // console.log("handleTotal", arr);
    let total = 0;
    arr.forEach((item) => {
      total += Number(getAmount(item[0]?.amount)) || 0;
    });

    return total;
  };
  return (
    <div className="inline-block border-2 border-primary rounded-full px-5 py-2 mb-6">
      Total carbon credit earned{" "}
      <span className="text-primary text-T-M leading-T-M">
        {projectTotal ? handleTotalCarbon(projectTotal) : 0}
      </span>
    </div>
  );
}

export default Total;
