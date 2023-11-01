import {
  useIOTState,
  useProjectInformation,
} from "src/DashboardComponents/handleData";
import BoxBorder from "./components/Box";
import { useMemo } from "react";
import { IOT__TYPE_TEXT } from "src/tools/const";
import dateFormat from "dateformat";
import Li from "./components/liComponent";
function InfoProject() {
  const iotState = useIOTState();
  const projectState = useProjectInformation();
  const infoModel = useMemo(
    () => ({
      type: iotState?.iot?.type ?? 0,
      implement: projectState?.createdAt
        ? dateFormat(new Date(projectState?.createdAt), "dd/mm/yyyy")
        : "",
      area: projectState?.specs?.specs?.area ?? "",
    }),
    [
      iotState?.iot?.type,
      projectState?.createdAt,
      projectState?.specs?.specs?.area,
    ]
  );
  return (
    <BoxBorder
      label="Info project"
      className={`h-full w-full lg:border py-5 px-4 lg:border-extended-700 rounded-md bg-extended-900`}
    >
      <ul>
        <Li textLeft={"Type"} textRight={IOT__TYPE_TEXT[infoModel?.type]} />
        <Li textLeft={"Implement"} textRight={infoModel.implement} />
        <Li
          noMarginBottom={true}
          textLeft={"Area"}
          textRight={infoModel?.area}
        />
      </ul>
    </BoxBorder>
  );
}

export default InfoProject;
