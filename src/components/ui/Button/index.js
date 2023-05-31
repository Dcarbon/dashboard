import stls from "./index.module.scss";
function Button({ children, ...all }) {
  return (
    <button className={stls.btn} {...all}>
      {children}
    </button>
  );
}

export default Button;
