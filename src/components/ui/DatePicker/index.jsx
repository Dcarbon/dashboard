import { Fragment, useMemo, useState } from "react";
import stls from "./index.module.scss";
import dateFormat from "dateformat";
import { DURATION__TYPE } from "src/components/sections/Dashboard/GeneratedViewBox/tools";
function DatePicker({
  currentIsActive,
  monthActiveList = [],
  initType = DURATION__TYPE.day,
  value = new Date(),
  onChangeValue,
  dayActiveList = [],
}) {
  const today_ = new Date();
  today_.setHours(0, 0, 0, 0);
  //   select month
  const [viewType, setviewType] = useState(initType);

  function getAllDaysInMonth(year, month) {
    const date = new Date(year, month, 1);
    const dates = [];
    while (date.getMonth() === month) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    // console.log("Datesssssssss", dates);
    return dates;
  }
  function getAllMonthInYear(time = new Date()) {
    const date = new Date(time);
    const months = [];
    let i = 0;
    while (i <= 11) {
      let newDate = new Date(date);
      newDate.setMonth(i);
      months.push(newDate);
      i++;
    }
    // console.log("Monthsssssssss", months)
    return months;
  }
  function get12YearNearest(time = new Date()) {
    const date = new Date(time);
    const years = [];
    let i = 0;
    while (i <= 11) {
      let newDate = new Date(date);
      newDate.setFullYear(2023 - (11 - i));
      years.push(newDate);
      i++;
    }
    return years;
  }

  const listofDays = useMemo(() => {
    return getAllDaysInMonth(value?.getUTCFullYear(), value?.getMonth());
  }, [value]);
  const listofMonth = useMemo(() => getAllMonthInYear(value), [value]);
  const listofYear = useMemo(() => get12YearNearest(value), [value]);

  const ViewTypeGroup = useMemo(() => {
    if (viewType) {
      let list = [],
        backBtn = "",
        nextBtn = "",
        heading = "",
        renderItem = () => "",
        ulClass = "",
        backType = "",
        nextType = "";
      switch (viewType) {
        //
        //
        //
        case DURATION__TYPE.year:
          list = listofYear;
          heading = "Select year";
          renderItem = (item) => dateFormat(item, "yyyy");
          ulClass = "gap-6 grid-cols-4";
          nextBtn = ">";
          nextType = DURATION__TYPE.month;
          break;
        //
        //
        //
        case DURATION__TYPE.month:
          list = listofMonth;
          nextBtn = dateFormat(value, "dd") + " >";
          heading = dateFormat(value, "yyyy");
          renderItem = (item) => dateFormat(item, "mmm");
          ulClass = "gap-8 grid-cols-4";
          nextType = DURATION__TYPE.day;
          break;
        //
        //
        //
        case DURATION__TYPE.day:
          list = listofDays;
          backBtn = "< " + dateFormat(value, "yyyy");
          heading = dateFormat(value, "mmmm");
          renderItem = (item) => dateFormat(item, "d");
          ulClass = "gap-1 grid-cols-7";
          backType = DURATION__TYPE.month;

          break;
      }
      return {
        list,
        backBtn,
        nextBtn,
        heading,
        renderItem,
        ulClass,
        backType,
        nextType,
      };
    }
  }, [listofDays, listofMonth, listofYear, viewType, value]);
  const configActive = useMemo(
    () => dayActiveList?.filter((item) => item?.actived && item?.date),
    [dayActiveList]
  );
  return (
    <Fragment>
      {/* header  */}
      {/* header  */}
      {/* header  */}
      {/* header  */}
      {/* header  */}
      {/* header  */}
      {/* header  */}
      {/* header  */}
      {/* header  */}
      {/* header  */}
      {/* header  */}
      {/* header  */}
      {/* header  */}
      {/* header  */}
      {/* header  */}
      <div className='flex w-full justify-between px-3 py-3'>
        <div className='w-1/5 '>
          {ViewTypeGroup.backBtn && (
            <Button
              text={ViewTypeGroup.backBtn}
              onClick={() => {
                onChangeValue(value, ViewTypeGroup.backType);
                setviewType(ViewTypeGroup.backType);
              }}
            />
          )}
        </div>
        <div className='flex-1 w-3/5 text-white text-center'>
          {ViewTypeGroup.heading}
        </div>
        <div className='w-1/5 text-right'>
          {ViewTypeGroup.nextBtn && (
            <Button
              text={ViewTypeGroup.nextBtn}
              onClick={() => {
                onChangeValue(value, ViewTypeGroup.nextType);
                setviewType(ViewTypeGroup.nextType);
              }}
            />
          )}
        </div>
      </div>
      {/* body */}
      {/* body */}
      {/* body */}
      {/* body */}
      {/* body */}
      {/* body */}
      {/* body */}
      {/* body */}
      {/* body */}
      {/* body */}
      {/* body */}
      {/* body */}
      {/* body */}
      {/* body */}
      {/* body */}
      <div className='py-3'>
        <ul className={`${ViewTypeGroup.ulClass} list-none grid`}>
          {ViewTypeGroup.list?.map((item, idx) => {
            let isActive = false;
            let isCurrent = false;
            // check active ngày
            if (configActive?.length > 0) {
              if (viewType === DURATION__TYPE.day) {
                let find = configActive.findIndex(
                  (item2) => item2.date === item?.getDate()
                );
                isActive = Boolean(find >= 0);
              }
            }
            // check active tháng
            if (
              monthActiveList?.length > 0 &&
              viewType === DURATION__TYPE.month
            ) {
              isActive = monthActiveList[item?.getMonth()].actived;
            }

            // check current và active
            if (value?.getTime() === item.getTime()) {
              isCurrent = true;
            }
            if (item?.getTime() === today_?.getTime()) {
              isActive = currentIsActive;
            }
            return (
              <li
                key={"-----date" + idx}
                className={`text-center  ${stls.item}`}
              >
                <button
                  className={`${stls.btn} ${isActive ? stls.active : ""} ${
                    isCurrent ? stls.current : ""
                  }`}
                  onClick={() => {
                    if (viewType === DURATION__TYPE.year) {
                      setviewType(ViewTypeGroup.nextType);
                      onChangeValue(item, ViewTypeGroup.nextType);
                    } else {
                      onChangeValue(item, viewType);
                    }
                  }}
                >
                  {ViewTypeGroup.renderItem(item)}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </Fragment>
  );
}

export default DatePicker;
function Button({ text, onClick }) {
  return (
    <button
      className='hover:bg-slate-400 hover:bg-opacity-20 px-2 py-0.5 min-w-[32px] rounded-sm'
      onClick={onClick}
    >
      <p className='text-sm'>{text}</p>
    </button>
  );
}
