import stls from "./Box.module.scss";
function BoxTabGenerator({ isActive, handleClick, title, total, unit }) {
  return (
    <button className={stls.button} onClick={handleClick}>
      <h2
        className={`text-H-M leading-H-M ${
          isActive ? "text-white" : "text-extended-300"
        }`}
      >
        {title}
      </h2>
      <p className="text-B-M leading-B-M">
        Total:{" "}
        <span
          className={`text-H-S leading-H-S ${
            isActive ? "text-extended-100 " : "text-extended-300"
          }`}
        >
          {total ?? 0}
        </span>{" "}
        <span className="text-extended-300 text-B-S leading-B-S">({unit})</span>
      </p>
    </button>
  );
}

export default BoxTabGenerator;
