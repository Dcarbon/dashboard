import BoxBorder from "./components/Box";
import { useMemo } from "react";
import { IOT__TYPE_TEXT } from "src/tools/const";
import dateFormat from "dateformat";
import Li from "./components/liComponent";
import { useProject } from "src/hook/useProject";
import { useIot } from "src/hook/useIOT";
function InfoProject() {
  const [iot] = useIot();
  const [project] = useProject();  
  const infoModel = useMemo(
    () => ({
      type: iot.type ?? 0,
      implement: project?.ca
        ? dateFormat(new Date(Number(project?.ca)), "dd/mm/yyyy")
        : "",
      area: project?.area ?? "",
    }),
    [iot?.type, project?.ca, project?.area]
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
