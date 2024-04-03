import BoxBorder from "./components/Box";
import { Fragment, useMemo } from "react";
import CopyButton from "src/components/ui/Button/CopyButton";
import Li from "./components/liComponent";
import { useProject, useProjectDetail } from "src/hook/useProject";
import { useIot } from "src/hook/useIOT";
function Address() {
  const [iot] = useIot();
  const [project] = useProject();
  const projectDetail = useProjectDetail(project?.id);
  const addressModel = useMemo(
    () => ({
      address: iot?.address || "",
      location: projectDetail?.location || "",
    }),
    [iot?.address, projectDetail?.location]
  );
  // handle Ether address
  const strCut = (str) => {
    const strReplace = str?.substring(5, str?.length - 4);
    return str?.replace(strReplace, "...");
  };
  const LogoSVG = () => {
    return (
      <svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M20 7.98572L16.7446 6.10579V2.34732L13.2554 0.332031L10 2.21196L6.74463 0.332031L3.25537 2.34732V6.10579L0 7.98572V12.0163L3.25537 13.8963V17.6547L6.74463 19.6701L10 17.7901L13.2554 19.6701L16.7446 17.6547V13.8963L20 12.0163V7.98572ZM3.95998 13.7595L5.23537 13.024L6.74463 12.1531L8.25537 13.024L9.76464 13.8963V17.1119L3.95998 13.7595ZM16.04 6.24258L14.7646 6.97809L13.2554 7.8504L11.7446 6.97809L10.2354 6.10579V2.89012L16.04 6.24258ZM10 6.51323L11.5093 7.3841L12.7846 8.12108L6.97999 11.4721V8.2564L8.48926 7.3841L10 6.51323ZM6.50927 8.2564V11.4721L3.72463 9.86422V6.64858L5 7.3841L6.50927 8.2564ZM3.48927 10.2717L6.27538 11.8795L5 12.6151L3.48927 13.4874L0.704616 11.8795L3.48927 10.2717ZM10 13.4874L8.48926 12.6165L7.21388 11.881L13.0185 8.52855V11.7442L11.5093 12.6165L10 13.4874ZM13.4893 11.7442V8.52855L16.2754 10.1364V13.352L15 12.6165L13.4907 11.7442H13.4893ZM16.5093 9.72889L13.7231 8.12108L14.9985 7.3841L16.5093 6.51323L19.2939 8.12108L16.5093 9.72889ZM16.2739 2.61797V5.83363L10.4678 2.48264L13.2539 0.874829L16.2739 2.61797ZM9.76316 6.10579L8.25389 6.97809L6.97852 7.7136V1.01015L9.76316 2.61797V6.10579ZM3.72315 2.61797L6.50779 1.01015V7.7136L5.23242 6.97809L3.72315 6.10579V2.61797ZM3.25242 6.64858V9.86422L0.467783 11.4721V8.2564L3.25242 6.64858ZM3.72315 17.3826V14.167L9.5278 17.5179L6.74169 19.1258L3.72168 17.3826H3.72315ZM10.2339 13.8948L11.7432 13.0225L13.0185 12.287V18.9904L10.2339 17.3826V13.8948ZM16.2739 17.3826L13.4878 18.9904V12.287L14.7632 13.0225L16.2739 13.8948V17.3826ZM16.7432 13.352V10.1364L19.5293 8.52855V11.7442L16.7432 13.352Z'
          fill='white'
        />
      </svg>
    );
  };
  return (
    <BoxBorder label='Address'>
      <ul>
        <Li
          textLeft={
            <Fragment>
              <span className='inline-flex items-center gap-2'>
                <LogoSVG /> Ethereum
              </span>
            </Fragment>
          }
          textRight={
            <Fragment>
              <span className='mr-2'>{strCut(addressModel?.address)}</span>
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
