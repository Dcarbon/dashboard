import Map from "react-map-gl";
import { MapInitProperties } from "src/constants/mapbox";
import OverView from "./overview";
import SourceGeojson from "../SourceGeojson";
import SourceVector from "./SourceVector";
import { useEffect, useRef, useState } from "react";
import { useIot } from "src/hook/useIOT";
function DashboardEarth() {
  const [currentZoom, setCurrentZoom] = useState(4);
  const mapREF = useRef(null);
  //   const [currentIot, setCurrentIot] = useCurrentIOT();
  const handleFlyTo = (center, zoom) => {
    try {
      mapREF?.current.flyTo({
        center: center, // lat, lng
        zoom: zoom,
      });
    } catch (error) {
      console.error("Coordinates is invalid", error);
    }
  };
  const [iot] = useIot();
  useEffect(() => {
    if (iot?.position) {
      handleFlyTo([iot.position.lat, iot.position.lng], 14);
    }
  }, [iot]);

  return (
    <Map
      ref={mapREF}
      {...MapInitProperties}
      onLoad={() => {
        let mymap = mapREF.current;
        let newZoom = 4;
        // let newCenter = [];
        console.log("mapREF", mapREF);
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
            console.log("listFeatures", listFeatures);
            // setIotSelected(listFeatures[0]);
            // setFeatures(listFeatures);
            // replace("/dashboard");
            // dispatch({
            //   type: SensorsACT.LOAD_SENSOR_1ST_TIME,
            //   payload: false,
            // });
            // setTimeout(() => {
            //   dispatch({
            //     type: SensorsACT.GET_SENSORS.REQUEST,
            //     payload: { skip: 0, limit: 50, iotId: listFeatures[0] },
            //   });
            // }, 100);
          }
        });

        // inspect a cluster on click
      }}
      onZoomEnd={(e) => setCurrentZoom(e.viewState.zoom)}
    >
      {/* Hiển thị tổng số nodes */}
      <OverView />
      <SourceGeojson visibility={Boolean(currentZoom < 10)} />
      <SourceVector visibility={Boolean(currentZoom >= 10)} />
    </Map>
  );
}

export default DashboardEarth;
