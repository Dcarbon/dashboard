import { useEffect, useRef, useState } from "react";
import stls from "./index.module.scss";
function Collapse({ isOpen, children }) {
  const [childHeight, setChildHeight] = useState(0);
  const contentREF = useRef(null);
  useEffect(() => {
    if (contentREF?.current) {
      const childHeightRaw = contentREF?.current.clientHeight;
      setChildHeight(`${childHeightRaw}px`);
    }
  }, []);
  return (
    <div
      className={stls.collapse}
      style={{
        maxHeight: isOpen ? childHeight : 0,
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
