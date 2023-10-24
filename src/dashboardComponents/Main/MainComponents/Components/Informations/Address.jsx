import {
  useIOTState,
  useProjectInformation,
} from "src/DashboardComponents/handleData";
import BoxBorder from "./components/Box";
import { Fragment, useMemo } from "react";
import CopyButton from "src/components/ui/Button/CopyButton";
import DcarbonAPI from "src/tools/DcarbonAPI";
import Li from "./components/liComponent";
function Address() {
  const iotState = useIOTState();

  const projectState = useProjectInformation();
  const projectDetail = useMemo(() => {
    let newD = new DcarbonAPI();
    return newD.ProjectInfo(projectState?.id);
  }, [projectState?.id]);
  const addressModel = useMemo(
    () => ({
      address: iotState?.iot?.address || "",
      location: projectDetail?.location || "",
    }),
    [iotState?.iot?.address, projectDetail?.location]
  );
  // handle Ether address
  const strCut = (str) => {
    const strReplace = str?.substring(5, str?.length - 4);
    return str?.replace(strReplace, "...");
  };
  return (
    <BoxBorder label="Address">
      <ul>
        <Li
          textLeft={"Ethereum"}
          textRight={
            <Fragment>
              <span className="mr-2">{strCut(addressModel?.address)}</span>
              <CopyButton obj={addressModel?.address} />
            </Fragment>
          }
        />
        <Li
          noMarginBottom={true}
          textLeft={"Location"}
          textRight={addressModel?.location}
        />
      </ul>
    </BoxBorder>
  );
}

export default Address;
