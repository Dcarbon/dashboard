import stls from "./index.module.scss";
function CommonBox({ children }) {
  return <div className={stls.box}>{children}</div>;
}

export default CommonBox;
