import Collapse from "src/components/ui/Collapse";
import stls from "./index.module.scss";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Heading from "src/components/ui/Heading";
import { Fragment } from "react";

/**
 * @type {object}
 *
 * @param {{
 *  color : ("green" | "blue"),
 *  disable : boolean,
 *  isOpen : boolean,
 *  handleOpen : any,
 *  title : string,
 *  strongNumb : number,
 *  unit : ("" | "kWh" | "m3"),
 * }}
 */
function CollapseTab({
  color,
  disable,
  isOpen,
  handleOpen,
  title,
  strongNumb,
  unit,
  children,
}) {
  return (
    <div className={stls.tab}>
      <div className={`${stls.header} ${stls[color]}`}>
        <div className="flex-auto">
          <Heading Tag={"h5"} className={`${stls.heading} text-white`}>
            {title}
          </Heading>

          <p className={stls.subtitle}>
            Total:{" "}
            {strongNumb ? (
              <Fragment>
                <b className="text-white">{strongNumb}</b>
                <span>
                  {unit === "m3" ? (
                    <>
                      m<sup>3</sup>
                    </>
                  ) : (
                    unit
                  )}
                </span>
              </Fragment>
            ) : (
              0
            )}
          </p>
        </div>
        {!disable && (
          <div
            className={`w-8 h-8 p-1 cursor-pointer transition duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
            onClick={handleOpen}
          >
            <ChevronDownIcon />
          </div>
        )}
      </div>
      <div className={`${stls.content} ${isOpen ? stls.active : ""}`}>
        {disable ? children : <Collapse isOpen={isOpen}>{children}</Collapse>}
      </div>
    </div>
  );
}

export default CollapseTab;
