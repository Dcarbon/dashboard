import stls from "./index.module.scss";
function ScrollBox({ size, disableY, disableX, children, className, style }) {
  return (
    <div
      className={`${className ?? ""} ${stls["scroll-box"]} ${
        disableY ? stls.disableY : ""
      } ${disableX ? stls.disableX : ""} ${size === "large" ? stls.large : ""}`}
      style={style}
    >
      {children}
    </div>
  );
}

export default ScrollBox;
