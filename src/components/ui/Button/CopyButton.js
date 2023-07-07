import { useCallback, useState } from "react";
import stls from "./CopyButton.module.scss";
function CopyButton({ className, obj }) {
  const [isCopy, setIsCopy] = useState(false);
  const handleCopy = useCallback(() => {
    if (!navigator?.cookieEnabled) {
      alert("The browser does not support or is blocking cookies");
      return;
    }
    if (!isCopy) {
      navigator?.clipboard?.writeText(obj);
      setIsCopy(true);
      setTimeout(() => setIsCopy(false), 1300);
    }
  }, [isCopy, obj]);
  return (
    <span className={`${className} relative inline-block`} onClick={handleCopy}>
      <ActivityStack isCopy={isCopy} />
      <StaticStack isCopy={isCopy} />
    </span>
  );
}

export default CopyButton;
function ActivityStack({ isCopy }) {
  return <span className={`${stls.activity} ${isCopy ? stls.act : ""}`}></span>;
}
function StaticStack({ isCopy }) {
  return (
    <span className={`${stls.static} ${isCopy ? stls.act : ""}`}>
      <span className={stls.left}></span>
      <span className={stls.bottom}></span>
    </span>
  );
}
