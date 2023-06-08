import stls from "./index.module.scss";
function Button({ className, children, ...all }) {
  return (
    <button className={`${stls.btn} ${className}`} {...all}>
      {children}
    </button>
  );
}

export default Button;
