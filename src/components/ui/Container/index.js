import stls from "./index.module.scss";
function Container({ full, className, children, standard = true }) {
  return (
    <div
      className={`container ${standard ? stls.standard : ""} mx-auto ${
        className ?? ""
      } ${full ? "w-full" : ""} `}
    >
      {children}
    </div>
  );
}

export default Container;
