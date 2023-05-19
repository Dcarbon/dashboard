import stls from "./divider.module.scss";
function Divider({ vertical, height, width, borderColor }) {
  return (
    <hr
      className={`${vertical ? stls.vertical : stls.horizontal}`}
      style={{
        "--divider-height": height + "px" ?? "inherit",
        "--divider-width": width + "px" ?? "inherit",
        "--divider-borderColor": borderColor ?? "#D9D9D926",
      }}
    />
  );
}

export default Divider;
