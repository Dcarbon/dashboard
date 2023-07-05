import Button from "src/components/ui/Button";
import stls from "./index.module.scss";
import { DURATION_TYPE_modal } from "./tools";
export default function DcarbonDuration({ durType, setDurType }) {
  var listDur = [
    {
      id: DURATION_TYPE_modal.WEEK,
      text: "7 days",
    },
    {
      id: DURATION_TYPE_modal.MONTH,
      text: "1 month",
    },
    {
      id: DURATION_TYPE_modal.MONTHs,
      text: "6 months",
    },
    {
      id: DURATION_TYPE_modal.YEAR,
      text: "1 year",
    },
  ];
  return (
    <div className={`grid grid-cols-4 ${stls.selectDuration}`}>
      {listDur.map((item) => (
        <div
          key={"dur-" + item.id}
          className={`${durType === item.id ? stls.active : ""}`}
        >
          <Button
            onClick={() => {
              console.log("item.id", item.id);
              setDurType(item.id);
            }}
            className={stls.btn}
          >
            {item.text}
          </Button>
        </div>
      ))}
    </div>
  );
}
