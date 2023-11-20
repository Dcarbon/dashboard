import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IOTAct } from "src/redux/actions/iotAction";

export function useCurrentIOT() {
  const { param } = useRouter();
  const res = useSelector((state) => state?.dashboardState?.currentIOT);
  return res;
}

export function useAllFeatures() {
  const dispatch = useDispatch();
  const all_iots = useSelector((state) => state.iot.all_iots);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (typeof all_iots === "undefined" && !loaded) {
      setLoaded(true);
      console.log("Request get all features available");
      dispatch({ type: IOTAct.GET_all_IOT.REQUEST });
    }
  }, [all_iots, dispatch, loaded]);
  return all_iots;
}
