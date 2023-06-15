import Collapse from "src/components/ui/Collapse";
import stls from "./index.module.scss";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Heading from "src/components/ui/Heading";

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
          {strongNumb && (
            <p className={stls.subtitle}>
              Total: <b className="text-white">{strongNumb}</b>({unit})
            </p>
          )}
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
