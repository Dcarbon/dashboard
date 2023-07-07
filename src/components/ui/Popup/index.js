import { XMarkIcon } from "@heroicons/react/24/solid";
import stls from "./index.module.scss";
function Popup({
  isOpen = false,
  setIsOpen,
  autoHide = true,
  hideDuration = 3000,
  color = "success" || "error" || "info",
  text = "",
}) {
  const onClose = () => {
    setIsOpen(false);
  };
  if (isOpen && autoHide) {
    setTimeout(onClose, [hideDuration]);
  }

  return (
    <div className={`${stls.box} ${isOpen ? stls.open : ""}`}>
      <div className={`${stls.content} ${stls[color ?? ""]}`}>
        <div className={stls.btn} onClick={onClose}>
          <XMarkIcon width={16} height={16} />
        </div>
        <div className={stls.text}>{text}</div>
      </div>
    </div>
  );
}

export default Popup;
