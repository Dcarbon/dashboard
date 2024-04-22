import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAmount } from "src/DashboardComponents/handleConfig";
import { IOTAct } from "src/redux/actions/iotAction";

export function useIotState() {
  const iotState = useSelector((state) => state?.iotState);
  return {
    all_iots: iotState?.all_iots,
    iots_by_project: iotState?.iots_by_project,
    iot: iotState?.iot,
    count: iotState?.count,
    iot_minted: iotState?.iot_minted,
    iots_minted: iotState?.iots_minted,
    total_minted: iotState?.total_minted,
    error: iotState?.error,
    error_code: iotState?.error_code,
    latest: iotState?.latest,
    loading: iotState?.loading,
    current: iotState?.current,
    amount:iotState?.amount,
  };
}

export function useCurrentIOT() {
  const { query, push, pathname } = useRouter();
  const setCurrent = (id) =>
    push(pathname + "?iot=" + id, pathname + "?iot=" + id, { scroll: true });
  return [query?.iot, setCurrent];
}
export function useCountIot() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  const iotState = useIotState();
  useEffect(() => {
    if (!loaded) {
      dispatch({ type: IOTAct.COUNT_IOT.REQUEST });
      setLoaded(true);
    }
  }, [dispatch, loaded]);
  return iotState?.count;
}
export function useOffsetIot() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  const iotState = useIotState();  
  useEffect(() => {
    if (!loaded) {
      dispatch({ type: IOTAct.OFFSET_IOT.REQUEST });
      setLoaded(true);
    }
  }, [dispatch, loaded]);
  return iotState?.amount;
}

export function useGet_all_iot() {
  const dispatch = useDispatch();
  const iotState = useIotState();
  const all_iots = iotState.all_iots;
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!all_iots && !loaded) {
      setLoaded(true);
      dispatch({ type: IOTAct.GET_all_IOT.REQUEST });
    }
  }, [all_iots, dispatch, loaded]);
  return all_iots;
}
export function useIot() {
  const dispatch = useDispatch();
  const iotState = useIotState();
  const handleSetIot = useCallback(
    (id) => {
      dispatch({ type: IOTAct.GET_IOT.REQUEST, payload: id });
    },
    [dispatch]
  );
  return [iotState.iot, handleSetIot];
}

export function useIots_by_project() {
  const dispatch = useDispatch();
  const iotState = useIotState();
  const handleSetIot_inside = useCallback(
    (id) => {
      dispatch({ type: IOTAct.GET_IOTs_byProject.REQUEST, payload: id });
    },
    [dispatch]
  );
  return [iotState.all_iots, handleSetIot_inside];
}
export function useIots_Minted() {
  const dispatch = useDispatch();
  const iotState = useIotState();
  const handleSetIot_inside = useCallback(
    (list) => {
      dispatch({
        type: IOTAct.GET_IOTs_MINTED.REQUEST,
        payload: {
          list,
        },
      });
    },
    [dispatch]
  );
  return [iotState.iots_minted, handleSetIot_inside];
}
export function useHandleIots_minted(total) {
  const [newValue, setNewValue] = useState([]);
  useEffect(() => {
    if (total) {      
      let nV = total?.map((item) => {                      
        if (item?.data?.length > 0) {
          let i = item?.data?.[0];        
          let returnVal = {
            id: i.id,
            iotId: i.iotId,
            nonce: i.nonce,
            amount: getAmount(i.amount),
            iot: i.iot,
          };

          return returnVal;
        }
        return { amount: 0 };
      });
      setNewValue(nV);
    }
  }, [total]);
  return newValue;
}
