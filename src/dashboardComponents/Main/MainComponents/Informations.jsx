import Heading from "./Components/Informations/Heading";
import Total from "./Components/Informations/Total";
import InfoProject from "./Components/Informations/InfoProject";
import Address from "./Components/Informations/Address";
import Power from "./Components/Informations/Power";
import Document from "./Components/Informations/Document";

function Information() {
  return (
    <div>
      <Total />
      <Heading />
      <div className="flex flex-wrap flex-col lg:flex-row space-y-4 lg:space-x-4 lg:space-y-0 mb-8">
        <div className="flex-1">
          <InfoProject />
        </div>
        <div className="w-full lg:w-[360px]">
          <Address />
        </div>
        <div className="w-full lg:w-[264px]">
          <Power />
        </div>
      </div>
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      <div className="flex flex-wrap flex-col lg:flex-row space-y-4 lg:space-x-4 lg:space-y-0">
        <div className="w-full lg:flex-1">
          <div className="w-11/12">
            <h3 className="text-H-S leading-H-S text-white mb-3">
              Description
            </h3>
            <div className="text-B-S leading-B-S">
              <p>
                With a daily amount of <span className="text-white">1000</span>{" "}
                kg waste, if it is not properly treated, it will cause
                environmental pollution, affecting the ecosystem in the area,
                leading to the death of the ecosystem within the region, as well
                as emitting tens or even hundreds of tons of greenhouse gases
                into the atmosphere every year.
              </p>
              <p>
                Therefore, when implementing a processing system with machine
                capacity <span className="text-white">500</span> kVA,
                environmental concerns will be thoroughly addressed and the
                health of the residents (HOW MANY HOUSEHOLDS) in the area will
                be protected, as well as the ability to transparently measure
                and monitor the waste treatment process on a daily and hourly
                basis.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[264px]">
          <Document />
        </div>
      </div>
    </div>
  );
}

export default Information;
