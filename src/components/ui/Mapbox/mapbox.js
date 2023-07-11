import { useEffect, useState } from "react";
import { Map } from "react-map-gl";
import OverView from "./overview";
import { useDispatch } from "react-redux";
import { SensorsACT } from "src/redux/actions/sensorsAction";
import MySource from "./source";
import { layer_1, layer_2 } from "./libs";
import { useRouter } from "next/router";

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_STYLE;
function MapBoxPage({ className, setFeatures, setIotSelected }) {
  // dev
  var defaultCenter = [105.008, 21.496];
  var defaultZoom = 12;
  // prod
  // var defaultCenter = [105.79, 21.147];
  // var defaultZoom = 8
  const [mymap, setMymap] = useState(null);
  const dispatch = useDispatch();
  const { query } = useRouter();
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

    mymap.on("click", ["hexagonLayer"], (e) => {
      if (e.features.length > 0) {
        hoveredStateId = e.features[0].id;
        listFeatures = handleDuplicateFeatures(e.features);
        setIotSelected(listFeatures[0]);
        setFeatures(listFeatures);
        dispatch({ type: SensorsACT.LOAD_SENSOR_1ST_TIME, payload: false });
        setTimeout(() => {
          dispatch({
            type: SensorsACT.GET_SENSORS.REQUEST,
            payload: { skip: 0, limit: 50, iotId: listFeatures[0] },
          });
        }, 100);
      }
    });
    return () => (hoveredStateId = 0);
  }, [dispatch, mymap, setFeatures, setIotSelected]);
  function Flyto(center, zoom) {
    mymap.flyTo({
      center: center,
      zoom: zoom || defaultZoom,
    });
  }

  return (
    <div className={className}>
      <Map
        ref={setMymap}
        initialViewState={{
          longitude: defaultCenter[0],
          latitude: defaultCenter[1],
          zoom: 4,
        }}
        maxZoom={20}
        minZoom={4}
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
        onLoad={() => {
          // console.log("mymap", mymap);
          // console.log("mymap.features", mymap?.getSource("iott_all"));
          if (mymap) {
            // const ftstate = mymap?.getFeatureState();
            // const lyer = mymap?.getLayer();
            // console.log("ftstate", ftstate);
            // console.log("lyer", lyer);
          }
          let newCenter = [];
          if (query?.lng && query?.lat) {
            newCenter = [query?.lng, query?.lat];
          }
          Flyto(newCenter?.length > 0 ? newCenter : defaultCenter, query?.zoom);
        }}
        onClick={(e) => console.log("e", e)}
      >
        {/* Hiển thị tổng số nodes */}
        <OverView />
        <MySource />
      </Map>
    </div>
  );
}

export default MapBoxPage;
