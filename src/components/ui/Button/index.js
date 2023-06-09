import { useRouter } from "next/router";
import stls from "./index.module.scss";
function Button({ className, onClick, href, children, ...all }) {
  const router = useRouter();
  const handleClick = (e) => {
    if (href) {
      router.push(href);
    } else {
      onClick(e);
    }
  };
  return (
    <button
      className={`${stls.btn} ${className}`}
      onClick={handleClick}
      {...all}
    >
      {children}
    </button>
  );
}

export default Button;
