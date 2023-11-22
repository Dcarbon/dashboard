import BoxBorder from "./components/Box";
import { useMemo } from "react";
import Li from "./components/liComponent";
import { useProject } from "src/hook/useProject";
function Power() {
  const projectState = useProject();
  const specs = useMemo(
    () => projectState?.specs?.specs,
    [projectState?.specs?.specs]
  );
  const powerModel = useMemo(
    () => ({
      livestocks: specs?.livestock || "",
      power: specs?.power || "",
      waste: specs?.waste || "",
    }),
    [specs?.livestock, specs?.power, specs?.waste]
  );

  return (
    <BoxBorder label="Power" gradient={true}>
      <ul>
        <Li textLeft={"Livestocks"} textRight={powerModel?.livestocks} />
        <Li textLeft={"Waste"} textRight={powerModel?.waste} />
        <Li
          textLeft={"Power"}
          textRight={powerModel?.power}
          noMarginBottom={true}
        />
      </ul>
    </BoxBorder>
  );
}

export default Power;
