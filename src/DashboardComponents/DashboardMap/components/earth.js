import Map from "react-map-gl";
import { MapInitProperties } from "src/constants/mapbox";
import OverView from "./overview";
import SourceGeojson from "../SourceGeojson";
import SourceVector from "./SourceVector";
import { useCallback, useEffect, useRef, useState } from "react";
import { useCurrentIOT, useIot } from "src/hook/useIOT";
import ZoomOptions from "./zoomOptions";
function DashboardEarth() {
  const [currentZoom, setCurrentZoom] = useState(4);
  const [loaded, setLoaded] = useState(false);
  const mapREF = useRef(null);
  const [currentIot, setCurrentIot] = useCurrentIOT();
  const [prevId, setPrevId] = useState();
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
  const tempState = useCallback(
    (sourceLayer, id) => ({
      source: "iott_all_vector",
      id: id,
      sourceLayer,
    }),
    []
  );
  const handleMultiFeatureState = useCallback(
    (hover, id) => {
      mapREF?.current?.setFeatureState(tempState("boundary", id), { hover });
      mapREF?.current?.setFeatureState(tempState("hexagon", id), { hover });
    },
    [tempState]
  );
  useEffect(() => {
    if (currentIot && mapREF.current && loaded) {
      if (prevId) {
        // console.log("clear old");
        handleMultiFeatureState(false, prevId);
      }
      // console.log("set new");
      setPrevId(currentIot);
      handleMultiFeatureState(true, currentIot);
    }
  }, [currentIot, handleMultiFeatureState, loaded, prevId]);

  return (
    <Map
      ref={mapREF}
      {...MapInitProperties}
      onLoad={() => {
        let mymap = mapREF.current;
        let newZoom = 4;
        mymap.on("click", ["clusters", "cluster-count"], (e) => {
          const features = mymap.queryRenderedFeatures(e.point, {
            layers: ["clusters"],
          });
          const clusterId = features[0]?.properties.cluster_id;
          if (features?.length > 0) {
            mymap
              .getSource("iott_all_geojson")
              .getClusterExpansionZoom(clusterId, (err, zoom) => {
                console.log("err, zoom", { err, zoom });
                if (err) return;
                newZoom = zoom;
                mymap.flyTo({
                  center: features[0].geometry.coordinates,
                  zoom: zoom,
                });
                setCurrentZoom(newZoom);
              });
          }
        });
        mymap.on("click", ["boundaryLayer", "hexagonLayer"], (e) => {
          const features = mymap.queryRenderedFeatures(e.point, {
            layers: ["hexagonLayer"],
          });
          if (features?.length > 0) {
            const hexId = features[0]?.id;
            setCurrentIot(hexId);
          }
        });
      }}
      onData={(e) => {
        if (e.isSourceLoaded && !loaded) {
          setLoaded(true);
        }
      }}
      onZoomEnd={(e) => setCurrentZoom(e.viewState.zoom)}
    >
      {/* Hiển thị tổng số nodes */}
      <OverView />
      <ZoomOptions mapREF={mapREF} />
      <SourceGeojson visibility={Boolean(currentZoom < 10)} />
      <SourceVector visibility={Boolean(currentZoom >= 10)} />
    </Map>
  );
}

export default DashboardEarth;
