import { Fragment } from "react";
import IconInformation from "src/components/icon/information";
import CircleLoading from "src/components/ui/Loading/CircleLoading";

function TotalBoxBorder({ title, number, className, loading, unit }) {
  console.log("number", number);
  console.log("unit", unit);
  return (
    <div
      className={`w-1/2 md:w-auto md:flex-1 ${className} border-extended-700 px-6 py-4`}
    >
      {loading ? (
        <CircleLoading />
      ) : (
        <Fragment>
          <p className="flex items-center gap-1 text-B-M leading-B-M text-extended-300 mb-3">
            {title}
            <IconInformation />
          </p>
          <h3 className="text-H-S leading-H-S text-white">
            {number ?? 0} {number > 0 ? unit : ""}
          </h3>
        </Fragment>
      )}
    </div>
  );
}

export default TotalBoxBorder;
