import Button from "src/components/ui/Button";
import stls from "./index.module.scss";
export default function DcarbonDuration({ durType, setDurType }) {
  var listDur = ["7 days", "1 month", "6 months", "1 year"];
  return (
    <div className={`grid grid-cols-4 ${stls.selectDuration}`}>
      {listDur.map((item, idx) => (
        <div
          key={"dur-" + idx}
          className={`${durType === idx ? stls.active : ""}`}
        >
          <Button onClick={() => setDurType(idx)} className={stls.btn}>
            {item}
          </Button>
        </div>
      ))}
    </div>
  );
}
