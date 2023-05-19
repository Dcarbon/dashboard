import stls from "./index.module.scss";
function ScrollBox({ disableY, disableX, children, className, style }) {
  return (
    <div
      className={`${className} ${stls["scroll-box"]} ${
        disableY ? stls.disableY : ""
      } ${disableX ? stls.disableX : ""}`}
      style={style}>
      {children}
    </div>
  );
}

export default ScrollBox;
