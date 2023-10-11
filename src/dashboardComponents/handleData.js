import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IOTAct } from "src/redux/actions/iotAction";
import DcarbonAPI from "src/tools/DcarbonAPI";

export function useAllFeatures() {
  const dispatch = useDispatch();
  const newAPI = new DcarbonAPI();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (!isLoaded) {
      dispatch({ type: IOTAct.GET_ALL_FEATURES.REQUEST });
      setIsLoaded(true);
    }
  }, [dispatch, isLoaded]);
  const iotState = useSelector(newAPI.GetIOTState);
  const features = useMemo(
    () => iotState?.all_features,
    [iotState?.all_features]
  );
  return features;
}
