import { useRef } from "react";
import stls from "./index.module.scss";
function ScrollBox({
  size,
  disableY,
  disableX,
  children,
  className,
  style,
  // handleScroll,
}) {
  const boxScroll = useRef(null);
  return (
    <div
      ref={boxScroll}
      className={`${className ?? ""} ${stls["scroll-box"]} ${
        disableY ? stls.disableY : ""
      } ${disableX ? stls.disableX : ""} ${stls[size ?? ""]}`}
      style={style}
      // onScroll={() => {
      //   console.log("boxCsroll", boxScroll);
      //   typeof handleScroll === "function" ? handleScroll(boxScroll) : null;
      // }}
    >
      {children}
    </div>
  );
}

export default ScrollBox;
