import Button from "src/components/ui/Button";
import stls from "./index.module.scss";
import { DURATION_TYPE_modal } from "./tools";
export default function DcarbonDuration({ durType, setDurType }) {
  var listDur = [
    {
      id: DURATION_TYPE_modal.WEEK,
      text: "A week",
    },
    // {
    //   id: DURATION_TYPE_modal.MONTH,
    //   text: "1 month",
    // },
    {
      id: DURATION_TYPE_modal.MONTH,
      text: "A month",
    },
    {
      id: DURATION_TYPE_modal.YEAR,
      text: "A year",
    },
  ];
  return (
    <div className={`flex ${stls.selectDuration}`}>
      {listDur.map((item) => (
        <div
          key={"dur-" + item.id}
          className={`flex-1 ${durType === item.id ? stls.active : ""}`}
        >
          <Button onClick={() => setDurType(item.id)} className={stls.btn}>
            {item.text}
          </Button>
        </div>
      ))}
    </div>
  );
}
