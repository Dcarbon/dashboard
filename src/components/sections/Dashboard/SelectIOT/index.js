import stls from "./index.module.scss";
import { useDispatch } from "react-redux";
import { ProjectACT } from "src/redux/actions/projectAction";
import SelectItem from "src/components/ui/Selection/SelectItem";
import Selection from "src/components/ui/Selection/Select";
import { SensorsACT } from "src/redux/actions/sensorsAction";
import Error from "src/components/ui/Error";
import { IOTAct } from "src/redux/actions/iotAction";
function SelectIOT({ err, features, iotSelected, setIotSelected }) {
  const dispatch = useDispatch();
  return (
    <div className={stls.main}>
      {features?.length > 0 && (
        <Selection
          label={"Select generator"}
          value={iotSelected}
          onChange={(e) => {
            // xóa trạng thái load sensor lần đầu
            dispatch({ type: SensorsACT.LOAD_SENSOR_1ST_TIME, payload: false });
            // xóa project hiện tại
            dispatch({ type: ProjectACT.CLEAR_PROJECT });
            setIotSelected(e.target.value);
          }}
        >
          {features?.map((item) => (
            <SelectItem
              key={"iott-" + item}
              value={item}
              active={item === iotSelected}
            >
              {item}
            </SelectItem>
          ))}
        </Selection>
      )}
      <Error err={err} clearErrType={IOTAct.CLEAR_ERR} />
    </div>
  );
}

export default SelectIOT;
