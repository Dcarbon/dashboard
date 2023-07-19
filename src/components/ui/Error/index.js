import { Fragment } from "react";
import FlexBetween from "../Stack/flex-between";

function Error({ err, err_code, clearErrType }) {
  if (err || err_code) {
    setTimeout(() => clearErrType(), 5000);
  }
  return (
    <Fragment>
      {/* <!-- Main modal --> */}
      <div
        id="defaultModal"
        tabIndex="-1"
        aria-hidden="true"
        className={`fixed top-0 left-0 ${
          err ? "visible" : "hidden"
        } w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full z-50`}
      >
        <div className="mx-auto mt-20 relative w-full max-w-2xl max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative bg-red-500 bg-opacity-80 rounded-lg border-2 border-red-700 shadow ">
            {/* <!-- Modal body --> */}
            <FlexBetween className={"items-center px-3 py-4"}>
              <p className="text-white">{err}</p>
              <button
                onClick={() => clearErrType(false)}
                data-modal-hide="defaultModal"
                type="button"
                className=" hover:text-white"
              >
                <BTNSVG />
              </button>
            </FlexBetween>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Error;
function BTNSVG() {
  return (
    <svg
      aria-hidden="true"
      className="w-4 h-4 inline-block align-text-top"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
