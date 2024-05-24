import { SENSOR__TYPE_TEXT, SENSOR__UNIT_html } from "src/tools/const";
import { Yesterday } from "../Charts/TotalNumber/Yesterday";
import { PastWeek } from "../Charts/TotalNumber/PastWeek";
import { Past30 } from "../Charts/TotalNumber/Past30";
import { AllTime } from "../Charts/TotalNumber/AllTime";
import { useEffect, useState } from "react";
import { getSum } from "src/DashboardComponents/handleConfig";
import {
  useCurrentIOT,
  useHandleIots_minted,
  useIotState,
  useIots_Minted,
} from "src/hook/useIOT";

function TotalGenerator({ typeSensor, sensorId }) {
  const [currentIot] = useCurrentIOT();
  const [data, setData] = useState(0);
  const [loading, setLoading] = useState(false);
  const iotState = useIotState();
  const iots_inside = iotState.iots_by_project;
  const [getTotal, setTotal] = useIots_Minted();
  const collection = useHandleIots_minted(getTotal);
  useEffect(() => {
    if (iots_inside) {
      setTotal(iots_inside);
    }
  }, [iots_inside, setTotal]);
  const handleTotal = (collection) => {
    if (collection?.length > 0) {
      let newCollection = collection.reduce((prev, curr) => {
        return {
          ...prev,
          amount: getSum(prev?.amount ?? 0, curr?.amount ?? 0),
        };
      });
      return Number(newCollection.amount ?? 0).toFixed(4);
    }
    return 0;
  };

  const handleTitleTotal = (type) => {
    let text = "Total carbon minted";
    if (type) {
      text = `Total ${SENSOR__TYPE_TEXT[type].toLowerCase()} generated`;
    }
    return text;
  };

  return (
    <div>
      <div className='flex flex-wrap gap-8'>
        <div className='w-full lg:w-[170px]'>
          {typeSensor === 0 && (
            <>
              <div>
                <p className='text-B-M leading-B-M text-extended-300'>
                  {handleTitleTotal(typeSensor)}
                </p>
                <p className='text-B-M leading-B-M text-extended-300'>
                  (all generator)
                </p>
              </div>
              <h3 className='text-H-M leading-H-M text-white'>
                {handleTotal(collection)}
              </h3>
            </>
          )}
        </div>
        <div className='flex-1'>
          <div className='flex flex-wrap md:flex-nowrap border border-extended-700 rounded-md '>
            <Yesterday data={data} loading={loading} typeSensor={typeSensor}/>
            <PastWeek data={data} loading={loading} typeSensor={typeSensor}/>
            <Past30
              data={data}
              loading={loading}
              setData={setData}
              setLoading={setLoading}
              typeSensor={typeSensor}
              id={currentIot}
              sensorId={sensorId}
            />
            <AllTime
              typeSensor={typeSensor}
              id={currentIot}
              sensorId={sensorId}
            />
          </div>
          <p className='py-2 text-right text-B-S leading-B-S'>
            Unit:
            <span className='uppercase'>{SENSOR__UNIT_html[typeSensor]}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default TotalGenerator;

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
