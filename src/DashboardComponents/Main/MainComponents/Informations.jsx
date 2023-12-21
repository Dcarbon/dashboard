import Heading from "./Components/Informations/Heading";
import Total from "./Components/Informations/Total";
import InfoProject from "./Components/Informations/InfoProject";
import Address from "./Components/Informations/Address";
// import Document from "./Components/Informations/Document";
import Description from "./Components/Informations/Description";

function Information() {
  return (
    <div>
      <div className="px-4 lg:px-0">
        <Total />
        <Heading />
      </div>
      <div className="flex flex-wrap flex-col lg:flex-row gap-3 lg:gap-5 mb-8">
        <div className="flex-1">
          <Description />
        </div>
        <div className="w-full lg:w-[596px]">
          <div className="flex flex-wrap flex-col md:flex-row gap-3 lg:gap-5">
            <div className="flex-1">
              <InfoProject />
            </div>
            {/* <div className="w-full lg:w-[264px]">
              <Document />
            </div> */}
            <div className="w-full">
              <Address />
            </div>
          </div>
        </div>

        {/* <Power />  */}
      </div>
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
    </div>
  );
}

export default Information;
