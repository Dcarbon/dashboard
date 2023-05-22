import { useCallback, useEffect, useState } from "react";
import { Layer, Map, Source } from "react-map-gl";
import OverView from "./overview";
// import MyMarkers from "./markers";
import { useDispatch, useSelector } from "react-redux";
import { customizationAction } from "src/redux/actions/customizationAction";
import HookAPI from "src/tools/hook";
const accessToken = process.env.NEXT_PUBLIC_MAPBOX_STYLE;

const layer_1 = {
  id: "boundaryLayer",
  type: "line",
  source: "iott_all",
  "source-layer": "boundary",
  layout: {
    // Make the layer visible by default.
    visibility: "visible",
    "line-cap": "round",
  },
  paint: {
    "line-color": [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      "#ffffff",
      "#72BF44",
    ],
    "line-width": [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      8,
      2,
    ],
    "line-opacity": [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      0.9,
      0.4,
    ],
  },
};

const layer_2 = {
  id: "hexagonLayer",
  type: "fill",
  source: "iott_all",
  "source-layer": "hexagon",
  layout: {
    visibility: "visible",
  },
  paint: {
    "fill-color": "#72BF44",
    "fill-antialias": true,
    "fill-opacity": [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      0.9,
      0.6,
    ],
  },
};
function MapBoxPage() {
  const [mymap, setMymap] = useState(null);
  const [lng, setLng] = useState(105.793123);
  const [lat, setLat] = useState(21.004998);
  const [zoom, setZoom] = useState(10);
  const [featureId, setFeatureId] = useState(null);
  const newHook = new HookAPI();
  const customState = useSelector(newHook.GetCustomState);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!customState?.mymap && mymap) {
      dispatch({ type: customizationAction.SET_MAP, payload: { mymap } });
    }
  }, [customState?.mymap, mymap, dispatch]);

  const changeIdFeature = useCallback(
    (id) =>
      dispatch({
        type: customizationAction.CHANGE_ID_FEATURE,
        payload: id,
      }),
    [dispatch]
  );
  useEffect(() => {
    if (!mymap) return;
    let hoveredStateId = null;
    let tempState = (sourceLayer) => ({
      source: "iott_all",
      id: hoveredStateId,
      sourceLayer,
    });
    let handleMultiFeatureState = (hover) => {
      mymap.setFeatureState(tempState(layer_1["source-layer"]), { hover });
      mymap.setFeatureState(tempState(layer_2["source-layer"]), { hover });
    };
    mymap.on("mousemove", ["boundaryLayer", "hexagonLayer"], (e) => {
      if (e.features.length > 0) {
        if (hoveredStateId !== null) {
          handleMultiFeatureState(false);
        }
        hoveredStateId = e.features[0].id;
        if (customState?.idFeature !== hoveredStateId) {
          setFeatureId(hoveredStateId);
        }

        handleMultiFeatureState(true);
      }
    });

    mymap.on("mouseleave", ["boundaryLayer", "hexagonLayer"], () => {
      if (hoveredStateId !== null) {
        setFeatureId(null);
        handleMultiFeatureState(false);
      }
      hoveredStateId = null;
    });
    mymap.on("click", ["boundaryLayer", "hexagonLayer"], (e) => {
      if (e.features.length > 0) {
        hoveredStateId = e.features[0].id;
        if (customState?.idFeature !== hoveredStateId) {
          changeIdFeature(hoveredStateId);
        }
      }
    });
    
  }, [changeIdFeature, customState?.idFeature, mymap]);

  return (
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
      mapStyle='mapbox://styles/vova999/clfhwlaqq007f01s2i8mwl7ew'
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
      }}>
      {/* {mymap && <MyMarkers mymap={mymap} />} */}
      <OverView featureId={featureId} />
      <Source
        id='iott_all'
        type='vector'
        tiles={[process.env.NEXT_PUBLIC_MAPSOURCE]}
        attribution='Show to users'>
        <Layer {...layer_1} />
        <Layer {...layer_2} />
      </Source>
    </Map>
  );
}

export default MapBoxPage;
