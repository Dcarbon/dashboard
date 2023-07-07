import { useEffect, useState } from "react";
import { Map } from "react-map-gl";
import OverView from "./overview";
import { useDispatch, useSelector } from "react-redux";
import { customizationAction } from "src/redux/actions/customizationAction";
import DcarbonAPI from "src/tools/hook";
import { SensorsACT } from "src/redux/actions/sensorsAction";
import MySource from "./source";
import { layer_1, layer_2 } from "./libs";

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_STYLE;
function MapBoxPage({ className, setFeatures, setIotSelected }) {
  const [mymap, setMymap] = useState(null);
  const [lng, setLng] = useState(105.793123);
  const [lat, setLat] = useState(21.004998);
  const [zoom, setZoom] = useState(10);
  const newDcarbon = new DcarbonAPI();
  const customState = useSelector(newDcarbon.GetCustomState);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!customState?.mymap && mymap) {
      dispatch({ type: customizationAction.SET_MAP, payload: { mymap } });
    }
  }, [customState?.mymap, mymap, dispatch]);

  useEffect(() => {
    if (!mymap) return;
    let hoveredStateId = null;
    let listFeatures = null;
    let tempState = (sourceLayer) => ({
      source: "iott_all",
      id: hoveredStateId,
      sourceLayer,
    });
    let handleDuplicateFeatures = (features) => {
      const newFeatures = features?.map((item) => item.id);
      return newFeatures.filter(
        (item, index) => newFeatures.indexOf(item) === index
      );
    };

    let handleMultiFeatureState = (hover) => {
      mymap.setFeatureState(tempState(layer_1["source-layer"]), { hover });
      mymap.setFeatureState(tempState(layer_2["source-layer"]), { hover });
    };
    // on move map get total node on project
    //
    //
    //
    //
    //
    //
    //
    //
    mymap.on("mousemove", ["boundaryLayer", "hexagonLayer"], (e) => {
      if (e.features.length > 0) {
        if (hoveredStateId !== null) {
          handleMultiFeatureState(false);
        }
        hoveredStateId = e.features[0].id;

        handleMultiFeatureState(true);
      }
    });

    // on move map delete total node on project
    //
    //
    //
    //
    //
    //
    //
    //
    mymap.on("mouseleave", ["boundaryLayer", "hexagonLayer"], () => {
      if (hoveredStateId !== null) {
        handleMultiFeatureState(false);
      }
      hoveredStateId = null;
    });

    // on Chooose
    // on Chooose
    // on Chooose
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

    mymap.on("click", ["boundaryLayer", "hexagonLayer"], (e) => {
      if (e.features.length > 0) {
        hoveredStateId = e.features[0].id;
        listFeatures = handleDuplicateFeatures(e.features);
        setIotSelected(listFeatures[0]);
        setFeatures(listFeatures);
        dispatch({ type: SensorsACT.LOAD_SENSOR_1ST_TIME, payload: false });
      }
    });
  }, [dispatch, mymap, setFeatures, setIotSelected]);

  return (
    <div className={className}>
      <Map
        ref={setMymap}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: zoom,
        }}
        maxZoom={20}
        minZoom={2}
        style={{
          width: "100%",
          height: "100%",
        }}
        projection={"globe"}
        mapStyle="mapbox://styles/vova999/clfhwlaqq007f01s2i8mwl7ew"
        fog={{
          color: "rgba(169, 200, 232, 0.8)", // Lower atmosphere
          "horizon-blend": 0.05,
          "high-color": "rgba(36, 92, 223, 0.7)", // Upper atmosphere
          "space-color": "rgb(11, 11, 25)", // Background color
          "star-intensity": 0.6, // Background star brightness (default 0.35 at low zoooms )
        }}
        mapboxAccessToken={accessToken}
        onMove={() => {
          if (mymap) {
            setLng(mymap.getCenter().lng.toFixed(4));
            setLat(mymap.getCenter().lat.toFixed(4));
            setZoom(mymap.getZoom().toFixed(2));
          }
        }}
      >
        {/* Hiển thị tổng số nodes */}
        <OverView />
        <MySource />
      </Map>
    </div>
  );
}

export default MapBoxPage;
