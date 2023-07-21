import { useEffect, useState } from "react";
import { Map } from "react-map-gl";
import OverView from "./overview";
import { useDispatch } from "react-redux";
import { SensorsACT } from "src/redux/actions/sensorsAction";
import { useRouter } from "next/router";
import SourceVector from "./SourceVector";
import SourceGeojson from "./SourceGeojson";
import Error from "../Error";

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_STYLE;
function MapBoxPage({
  mymap,
  setMymap,
  className,
  setFeatures,
  setIotSelected,
  errFlyTo,
  setErrFlyTo,
}) {
  // dev
  var defaultCenter = [105.008, 21.496];
  var defaultZoom = 12;
  // prod
  // var defaultCenter = [105.79, 21.147];
  // var defaultZoom = 8
  const [currentZoom, setCurrentZoom] = useState(null);
  const dispatch = useDispatch();
  const { query, replace } = useRouter();

  useEffect(() => {
    if (!mymap) return;
    let hoveredStateId = null;
    let listFeatures = null;
    let tempState = (sourceLayer) => ({
      source: "iott_all_2",
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
      mymap.setFeatureState(tempState("boundary"), { hover });
      mymap.setFeatureState(tempState("hexagon"), { hover });
    };
    // on move map get total node on project
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
    mymap.on("mouseleave", ["boundaryLayer", "hexagonLayer"], () => {
      if (hoveredStateId !== null) {
        handleMultiFeatureState(false);
      }
      hoveredStateId = null;
    });

    // on Chooose
    // on Chooose
    // on Chooose

    mymap.on("click", ["hexagonLayer"], (e) => {
      if (e.features.length > 0) {
        hoveredStateId = e.features[0].id;
        listFeatures = handleDuplicateFeatures(e.features);
        setIotSelected(listFeatures[0]);
        setFeatures(listFeatures);
        replace("/dashboard");
        dispatch({ type: SensorsACT.LOAD_SENSOR_1ST_TIME, payload: false });
        setTimeout(() => {
          dispatch({
            type: SensorsACT.GET_SENSORS.REQUEST,
            payload: { skip: 0, limit: 50, iotId: listFeatures[0] },
          });
        }, 100);
      }
    });

    // inspect a cluster on click

    return () => (hoveredStateId = 0);
  }, [currentZoom, dispatch, mymap, replace, setFeatures, setIotSelected]);

  const Flyto = (center, zoom) => {
    if (mymap) {
      try {
        mymap?.flyTo({
          center: center,
          zoom: zoom,
        });
      } catch (error) {
        setErrFlyTo(true);
        console.error("Coordinates is invalid", error);
      }
    }
  };

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
        minZoom={0}
        style={{
          width: "100%",
          height: "100%",
        }}
        pitch={0}
        projection={"globe"}
        mapStyle='mapbox://styles/vova999/clfhwlaqq007f01s2i8mwl7ew'
        fog={{
          color: "rgba(169, 200, 232, 0.5)", // Lower atmosphere
          "horizon-blend": 0.03,
          "high-color": "rgba(36, 92, 223, 0.7)", // Upper atmosphere
          "space-color": "rgb(11, 11, 25)", // Background color
          "star-intensity": 0.6, // Background star brightness (default 0.35 at low zoooms )
        }}
        mapboxAccessToken={accessToken}
        onZoomEnd={(e) => setCurrentZoom(e.viewState.zoom)}
        onLoad={() => {
          let newZoom = defaultZoom;
          let newCenter = [];
          if (query?.lng && query?.lat) {
            newCenter = [query?.lng, query?.lat];
            newZoom = query?.zoom;
          }
          setCurrentZoom(newZoom);
          Flyto(newCenter?.length > 0 ? newCenter : defaultCenter, newZoom);
          mymap.on("click", ["clusters", "cluster-count"], (e) => {
            const features = mymap.queryRenderedFeatures(e.point, {
              layers: ["clusters"],
            });

            const clusterId = features[0]?.properties.cluster_id;

            if (features?.length > 0) {
              mymap
                .getSource("iott_all")
                .getClusterExpansionZoom(clusterId, (err, zoom) => {
                  if (err) return;
                  newZoom = zoom;
                  mymap.flyTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom,
                  });
                  setCurrentZoom(newZoom);
                });
            } else if (e?.lngLat) {
              newZoom = 11.4;
              mymap.flyTo({
                center: [e.lngLat?.lng, e.lngLat?.lat],
                zoom: newZoom,
              });
              setCurrentZoom(newZoom);
            }
          });
          mymap.on("zoom", (e) => (newZoom = e.viewState.zoom));
        }}
      >
        {/* Hiển thị tổng số nodes */}
        <OverView />
        <SourceGeojson visibility={Boolean(currentZoom < 10)} />
        <SourceVector visibility={Boolean(currentZoom >= 10)} />
      </Map>
      <Error
        err={errFlyTo ? "This Coordinate is invalid" : ""}
        clearErrType={setErrFlyTo}
      />
    </div>
  );
}

export default MapBoxPage;
