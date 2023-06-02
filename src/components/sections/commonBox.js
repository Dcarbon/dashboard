import stls from "./index.module.scss";
function CommonBox({ className, children }) {
  return <div className={`${stls.box} ${className ?? ""}`}>{children}</div>;
}

export default CommonBox;
