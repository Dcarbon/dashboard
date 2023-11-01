import stls from "./index.module.scss";
function BoxBorder({ className, gradient, label, children }) {
  return (
    <div
      className={
        className ||
        `h-full w-full ${
          gradient ? stls.boxBorderGradient : ""
        } border py-5 px-4 border-extended-700 rounded-md bg-extended-900`
      }
    >
      <h4 className="text-B-M leading-B-M text-white mb-4">{label}</h4>
      {children}
    </div>
  );
}

export default BoxBorder;
