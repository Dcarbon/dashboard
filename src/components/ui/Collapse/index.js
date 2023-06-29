import { useMemo, useRef } from "react";
import stls from "./index.module.scss";
function Collapse({ isOpen, children }) {
  const boxConetentREF = useRef(null);
  const contentREF = useRef(null);
  const clientHeight = useMemo(() => {
    return contentREF?.current?.clientHeight;
  }, []);

  return (
    <div
      ref={boxConetentREF}
      className={stls.collapse}
      style={{
        maxHeight: isOpen ? clientHeight + "px" : 0,
      }}
    >
      <div ref={contentREF}>{children}</div>
    </div>
  );
}

Collapse.defaultProps = {
  isOpen: false,
};
export default Collapse;
