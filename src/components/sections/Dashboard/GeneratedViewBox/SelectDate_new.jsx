import { useCallback, useEffect, useMemo, useState } from "react";
import DatePicker from "src/components/ui/DatePicker";
import { Get_list_time, oneDay, roundup_second } from "./tools";
import stls from "./SelectDate.module.scss";
import { SENSOR__TYPE, SENSOR__TYPE_TEXT } from "src/tools/const";
import { AxiosGet } from "src/redux/sagaUtils";
function SelectDate_new({
  iotSelected,
  currentDate = new Date(),
  setCurrentDate,
  currentSensorId,
  currentSensorType,
  // state hiển thị kiểu Calendar :
  // - DURATION__TYPE.day : hiển thị số ngày trong tháng
  // - DURATION__TYPE.month : hiển thị 12 tháng
  durationType,
  setDurationType,
}) {
  const [isLoadMonths, setIsLoadMonths] = useState(true);
  const [isLoadDays, setIsLoadDays] = useState(true);
  const [status_months, setStatus_months] = useState([]);
  const [status_days, setStatus_days] = useState([]);
  const [currentIsActive, setCurrentIsActive] = useState(false);
  // key lưu dữ liệu localstorage theo năm hiện tại
  const local_key_months = useMemo(() => {
    const thisYear = currentDate?.getFullYear();
    return (
      "Year_" +
      thisYear +
      "_iot_" +
      iotSelected +
      "_sensor_" +
      SENSOR__TYPE_TEXT[currentSensorType]
    );
  }, [currentDate, currentSensorType, iotSelected]);
  const isExist_local_months = useMemo(() => {
    // console.log("Kiểm tra months trong local theo key=", local_key_months);
    return local_key_months
      ? JSON.parse(localStorage.getItem(local_key_months))
      : null;
  }, [local_key_months]);

  // key lưu dữ liệu localstorage theo tháng hiện tại
  const local_key_days = useMemo(() => {
    const thismonth = currentDate?.getMonth();
    return (
      "Month_" +
      (Number(thismonth) + 1) +
      "_iot_" +
      iotSelected +
      "_sensor_" +
      SENSOR__TYPE_TEXT[currentSensorType]
    );
  }, [currentDate, currentSensorType, iotSelected]);
  const isExist_local_days = useMemo(() => {
    // console.log("Kiểm tra days trong local theo key=", local_key_days);
    return local_key_days
      ? JSON.parse(localStorage.getItem(local_key_days))
      : null;
  }, [local_key_days]);
  //
  //
  //
  //
  const isToday = useMemo(() => {
    let today = new Date();
    return currentDate?.getDate() === today.getDate();
  }, [currentDate]);
  const isCarbon = useMemo(
    () => currentSensorType === SENSOR__TYPE.None,
    [currentSensorType]
  );
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  // kiểm tra active dùng chung
  const HANDLE_check_active_Type = useCallback(() => {
    let Api_by_sensor_type = "";
    // nếu currentSensorType === 0 => hiển thị carbon
    if (isCarbon) {
      Api_by_sensor_type = `iots/${iotSelected}/is-actived?`;
    } else {
      Api_by_sensor_type = `sensors/sm/aggregate?iotId=${iotSelected}&sensorId=${currentSensorId}&`;
    }
    return Api_by_sensor_type;
  }, [currentSensorId, iotSelected, isCarbon]);

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  // kiểm tra active theo 12 tháng
  const HANDLE_CHECK_by_month = useCallback(() => {
    if (currentSensorId > 0) {
      if (isExist_local_months) {
        setStatus_months(isExist_local_months);
        setIsLoadMonths(false);
      } else {
        const url = HANDLE_check_active_Type();
        // kiểm tra active theo 12 tháng
        // xác định thời gian hiện tại đang được chọn (để lấy năm đang cần kiểm tra)
        const newTimeStart = new Date(currentDate);
        const newTimeEnd = new Date(currentDate);
        // ngày bắt đầu tính từ [1/(tháng hiện tại)] ( lấy đầu tháng 0h:0m:0s )
        newTimeStart.setDate(1);
        // ngày kết thúc tính từ [1/(tháng sau) -  1 ngày] ( lấy cuối tháng 23h:59m:59s )
        newTimeEnd.setDate(1);
        newTimeEnd.setHours(23, 59, 59, 99);
        let promisesList = [];
        // bắt đầu vòng lặp từ tháng 0
        for (let index = 0; index < 12; index++) {
          newTimeStart.setMonth(index);
          newTimeEnd.setMonth(index + 1);
          let startMonth = newTimeStart.getTime();
          let endMonth = newTimeEnd.getTime() - oneDay; //đầu tháng/năm mới - 1s
          let newFrom = Math.round(startMonth / 1000);
          let newTo = Math.round(endMonth / 1000);
          // eslint-disable-next-line no-undef
          promisesList[index] = new Promise((resolve) =>
            resolve(AxiosGet(url + `from=${newFrom}&to=${newTo}&interval=2`))
          );
        }

        // eslint-disable-next-line no-undef
        Promise.all(promisesList)
          .then((res) => {
            let newListToUse = res.map((item, idx) => {
              return {
                month: idx + 1,
                actived: isCarbon
                  ? item?.data?.actived
                  : item?.data?.length > 0,
              };
            });
            setStatus_months(newListToUse);
            localStorage.setItem(
              local_key_months,
              JSON.stringify(newListToUse)
            );
            setIsLoadMonths(false);
          })
          .catch((error) => console.error("Promises all catch err", error));
      }
    }
  }, [
    HANDLE_check_active_Type,
    currentDate,
    currentSensorId,
    isCarbon,
    isExist_local_months,
    local_key_months,
  ]);
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  // kiểm tra active theo số ngày trong tháng
  const HANDLE_CHECK_by_days = useCallback(() => {
    if (currentSensorId > 0) {
      if (isExist_local_days) {
        setStatus_days(isExist_local_days);
        setIsLoadDays(false);
      } else {
        const url = HANDLE_check_active_Type();
        // kiểm tra active theo số ngày trong tháng
        // lấy số ngày trong tháng  (đại diện là 1 mảng có chiều dài bằng số ngày)
        let list_days_in_this_month = Get_list_time(
          currentDate?.getTime(),
          "month"
        );

        let promisesList = [];
        let newListToUse = [];
        // bắt đầu vòng lặp từ tháng 0
        promisesList = list_days_in_this_month.map((item) => {
          // xác định ngày hiện tại trong vòng lặp
          const newTime = new Date(item);
          // bắt đầu tính từ 0h:0m:0s
          let newFrom = roundup_second(newTime);
          // kết thúc tính đến 23h:59m:59s
          newTime.setHours(23, 59, 59, 99);
          let newTo = roundup_second(newTime);
          // eslint-disable-next-line no-undef
          return new Promise((resolve) =>
            resolve(AxiosGet(url + `from=${newFrom}&to=${newTo}&interval=1`))
          );
        });

        // eslint-disable-next-line no-undef
        Promise.all(promisesList)
          .then((res) => {
            newListToUse = list_days_in_this_month.map((item, idx) => {
              let newDate = new Date(item);
              return {
                date: newDate.getDate(),
                time: item,
                actived: isCarbon
                  ? res[idx]?.data?.actived
                  : res[idx]?.data?.length > 0,
              };
            });
            setStatus_days(newListToUse);
            localStorage.setItem(local_key_days, JSON.stringify(newListToUse));
            setIsLoadDays(false);
          })
          .catch((error) => console.error("Promises days catch err", error));
      }
    }
  }, [
    HANDLE_check_active_Type,
    currentDate,
    currentSensorId,
    isCarbon,
    isExist_local_days,
    local_key_days,
  ]);
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  // kiểm tra active theo ngày hôm nay
  const HANDLE_CHECK_by_today = useCallback(() => {
    console.log("HANDLE_CHECK_by_today");
    // let isActiveAvailable = false;
    // if (isExist_local_days) {
    //   let today = new Date();
    //   today.setHours(0, 0, 0, 0);
    //   let checkInArr = isExist_local_days.findIndex(
    //     (item) => item.time === today.getTime() && item.actived
    //   );
    //   if (checkInArr >= 0) {
    //     isActiveAvailable = true;
    //     setCurrentIsActive(true);
    //   }
    // }
    if (currentSensorId > 0) {
      const url = HANDLE_check_active_Type();
      const today_ = new Date();
      today_.setHours(0, 0, 0, 0);
      let newFrom = Math.round(today_.getTime() / 1000);
      today_.setHours(23, 59, 59, 99);
      let newTo = Math.round(today_.getTime() / 1000);

      // eslint-disable-next-line no-undef
      const promise_ = new Promise((resolve) =>
        resolve(AxiosGet(url + `from=${newFrom}&to=${newTo}&interval=1`))
      );
      promise_
        .then((res) => {
          setCurrentIsActive(
            isCarbon ? res.data?.actived : res.data?.length > 0
          );
        })
        .catch((error) =>
          console.error(`Promises ${iotSelected} catch err`, error)
        );
    }
  }, [HANDLE_check_active_Type, currentSensorId, iotSelected, isCarbon]);
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  useEffect(() => {
    // nếu thay đổi iot hoặc
    // nếu thay đổi sensor type hoặc
    // nếu thay đổi durationType và localstorage không có key  theo type
    // thì thay đổi dữ liệu active
    //
    if (
      iotSelected ||
      currentSensorType ||
      !isExist_local_months ||
      !isExist_local_days
    ) {
      console.log("RESET");
      setIsLoadDays(true);
      setIsLoadMonths(true);
      setStatus_days([]);
      setStatus_months([]);
      setCurrentIsActive(false);
      // console.log("loading... by ", {
      //   iotSelected,
      //   durationType,
      //   local_key_months,
      //   local_key_days,
      //   check_active_Type: HANDLE_check_active_Type(),
      // });
    }
  }, [
    currentSensorType,
    iotSelected,
    isExist_local_days,
    isExist_local_months,
    local_key_days,
    local_key_months,
  ]);

  useEffect(() => {
    // console.log("isLoadDays", isLoadDays);
    if (isLoadDays) {
      HANDLE_CHECK_by_days();
    }
  }, [HANDLE_CHECK_by_days, isLoadDays]);
  useEffect(() => {
    // console.log("isLoadMonths", isLoadMonths);
    if (isLoadMonths) {
      HANDLE_CHECK_by_month();
    }
  }, [HANDLE_CHECK_by_month, isLoadMonths]);
  useEffect(() => {
    if (isToday && !currentIsActive) {
      HANDLE_CHECK_by_today();
      let thisInterval = setInterval(() => {
        HANDLE_CHECK_by_today();
      }, 5000);
      return () => {
        clearInterval(thisInterval);
      };
    }
  }, [HANDLE_CHECK_by_today, currentIsActive, isToday]);

  return (
    <div
      className={`${stls.main}  ${
        isLoadDays || isLoadMonths ? stls.active : ""
      }`}
    >
      <div className="bg-[#32313D] w-full h-[244px] rounded-md overflow-hidden my-3 ">
        {(isLoadDays || isLoadMonths) && (
          <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full bg-[#000000] bg-opacity-0 z-50">
            <svg
              className="animate-spin  h-10 w-10 text-blue-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}

        <div className="flex flex-col h-full">
          <DatePicker
            currentIsActive={currentIsActive}
            status_months={status_months}
            status_days={status_days}
            durationType={durationType}
            // list_time_by_duration={list_time_by_duration}
            local_key_days={local_key_days}
            local_key_months={local_key_months}
            iotSelected={iotSelected}
            initType={durationType}
            value={currentDate}
            onChangeValue={(time, type) => {
              setCurrentDate(time);
              setDurationType(type);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default SelectDate_new;
