import { useEffect, useRef, useState } from "react";
import stls from "./index.module.scss";
function Collapse({ isOpen, children }) {
  const boxConetentREF = useRef(null);
  const contentREF = useRef(null);
  const [cH, setCH] = useState(0);

  useEffect(() => {
    let intervalColl = setInterval(() => {
      setCH(contentREF.current?.clientHeight);
    }, 500);

    return () => {
      clearInterval(intervalColl);
    };
  }, []);

  return (
    <div
      ref={boxConetentREF}
      className={stls.collapse}
      style={{
        maxHeight: isOpen ? cH + "px" : 0,
      }}
    >
      <div ref={contentREF} className={stls[isOpen ? "show" : ""]}>
        {children}
      </div>
    </div>
  );
}

Collapse.defaultProps = {
  isOpen: false,
};
export default Collapse;
