import { useRef } from "react";
import stls from "./index.module.scss";
function Collapse({ isOpen, children }) {
  const contentREF = useRef(null);

  return (
    <div
      className={stls.collapse}
      style={{
        maxHeight: isOpen ? `${contentREF?.current?.clientHeight}px` : 0,
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
