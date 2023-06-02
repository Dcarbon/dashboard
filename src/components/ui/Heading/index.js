import stls from "./index.module.scss";
function Heading({
  Tag,
  className,
  children,
  textGradient = false,
  weigth = 500,
}) {
  return (
    <div className={`${stls.heading} ${weigth ? stls["font-" + weigth] : ""}`}>
      <Tag
        className={`${className ?? ""} ${
          textGradient ? stls.textGradient : ""
        }`}
      >
        {children}
      </Tag>
    </div>
  );
}

export default Heading;
