import { useRouter } from "next/router";
import * as React from "react";
import { useEffect } from "react";
import Map, { Layer, Source } from "react-map-gl";
import SourceGeojson from "src/components/ui/Mapbox/SourceGeojson";
const accessToken = process.env.NEXT_PUBLIC_MAPBOX_STYLE;
function Earth() {
  const homePageMapREF = React.useRef(null);
  const [loaded, setLoaded] = React.useState(false);
  const [zoom, setZoom] = React.useState(0.7);
  function ResizeEarth(e) {
    let container = e?.target?.getCanvasContainer();
    let width = container?.clientWidth;
    let newZoom = 0;
    if (width <= 300) {
      newZoom = 0.2;
    } else if (width <= 350) {
      newZoom = 0.6;
    } else if (width <= 400) {
      newZoom = 0.9;
    } else if (width <= 450) {
      newZoom = 1.1;
    } else if (width <= 500) {
      newZoom = 1.3;
    } else if (width <= 600) {
      newZoom = 1.5;
    } else {
      newZoom = 1.7;
    }
    e?.target?.resize();
    setZoom(newZoom);
    setLoaded(false);
  }
  var defaultCenter = [105.008, 21.496];
  function SpinEarth() {
    if (homePageMapREF?.current) {
      let map = homePageMapREF.current;
      const center = map?.getCenter();
      center.lng -= 4;
      map.easeTo({
        center,
        duration: 1000,
        easing: (n) => n,
      });
    }
  }
  useEffect(() => {
    if (homePageMapREF?.current) {
      if (!loaded) {
        homePageMapREF.current?.zoomTo(zoom);
        setLoaded(true);
      }
    }
  }, [loaded, zoom]);
  const router = useRouter();
  return (
    <React.Fragment>
      <Map
        ref={homePageMapREF}
        projection={"globe"}
        initialViewState={{
          longitude: defaultCenter[0],
          latitude: defaultCenter[1],
          zoom: 0,
        }}
        pitch={0}
        touchZoomRotate={false}
        boxZoom={false}
        scrollZoom={false}
        doubleClickZoom={false}
        mapStyle={"mapbox://styles/qing95/clk6db90d00ad01pga1gqgfq3"}
        mapboxAccessToken={accessToken}
        style={{ width: "100%", height: "100%" }}
        fog={{
          color: "rgba(227, 252, 255, 0.15)", // Lower atmosphere
          "horizon-blend": 0.03,
          "high-color": "rgba(0, 0, 0, 0.1)", // Upper atmosphere
          "space-color": "rgba(255, 255, 255, 0)", // Background color
        }}
        onLoad={(e) => {
          ResizeEarth(e);
          if (homePageMapREF.current) {
            let map = homePageMapREF.current;
            let newInterval = setInterval(SpinEarth, 500);
            map.on("mousedown", () => {
              clearInterval(newInterval);
            });
            map.on("touchstart", () => {
              clearInterval(newInterval);
            });

            // Restart spinning the globe when interaction is complete
            map.on("mouseup", () => {
              newInterval = setInterval(SpinEarth, 500);
            });
            map.on("touchend", () => {
              newInterval = setInterval(SpinEarth, 500);
            });
            map.on("click", "clusters", (e) => {
              console.log("e", e);
              console.log("map", map);
              const features = map.queryRenderedFeatures(e.point, {
                layers: ["clusters"],
              });
              let geometry = features[0].geometry.coordinates;
              router.push(
                `/dashboard?lng=${geometry[0]}&lat=${geometry[1]}&zoom=7.5`
              );
            });
          }
        }}
        onResize={ResizeEarth}
      >
        <SourceGeojson />
      </Map>
    </React.Fragment>
  );
}

export default Earth;
//
