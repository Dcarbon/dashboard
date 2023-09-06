import { Fragment, useCallback, useEffect } from "react";
import DatePicker from "src/components/ui/DatePicker";
import { GET_Payload, Get_list_time } from "./tools";
function SelectDate({
  currentIsActive,
  monthActiveList,
  dayActiveList,
  iotSelected,
  list_time_by_duration,
  durationType,
  setDurationType,
  currentDate,
  setCurrentDate,
  setList_time_by_duration,
  setPayload,
}) {
  // console.log("currentIsActive", currentIsActive);
  const handleNewListTime = useCallback(
    (time, type) => {
      const newPayload = GET_Payload(time?.getTime(), type);
      setPayload(newPayload);
      const newListTime = Get_list_time(time?.getTime(), type);
      setList_time_by_duration(newListTime);
    },
    [setList_time_by_duration, setPayload]
  );
  useEffect(() => {
    if (list_time_by_duration?.length === 0) {
      handleNewListTime(currentDate, durationType);
    }
  }, [
    currentDate,
    durationType,
    handleNewListTime,
    list_time_by_duration?.length,
  ]);

  return (
    <Fragment>
      <h1 className='text-center text-gray-200 font-normal my-3'>
        Select date
      </h1>
      <div className='bg-[#32313D] w-full h-[244px] rounded-md my-3'>
        <div className='flex flex-col h-full'>
          <DatePicker
            currentIsActive={currentIsActive}
            monthActiveList={monthActiveList}
            dayActiveList={dayActiveList}
            durationType={durationType}
            list_time_by_duration={list_time_by_duration}
            iotSelected={iotSelected}
            initType={durationType}
            value={currentDate}
            onChangeValue={(time, type) => {
              setCurrentDate(time);
              setDurationType(type);
              handleNewListTime(time, type);
            }}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default SelectDate;
