import { useEffect, useRef, useState } from "react";
import stls from "./index.module.scss";
function Collapse({ isOpen, children }) {
  const boxConetentREF = useRef(null);
  const contentREF = useRef(null);
  const [clientHeight, setclientHeight] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const box = boxConetentREF?.current?.clientHeight;
    const child = contentREF?.current?.clientHeight;
    if (box < child) {
      setclientHeight(child);
      boxConetentREF.current.style.maxHeight = child;
    }
  });
  return (
    <div
      ref={boxConetentREF}
      className={stls.collapse}
      style={{ maxHeight: isOpen ? clientHeight + "px" : 0 }}
    >
      <div ref={contentREF}>{children}</div>
    </div>
  );
}

Collapse.defaultProps = {
  isOpen: false,
};
export default Collapse;
