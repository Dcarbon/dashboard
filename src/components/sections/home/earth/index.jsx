import * as React from "react";
import { Fragment, useRef, useState, useEffect } from "react";
import Map, { Layer, Source } from "react-map-gl";
const accessToken = process.env.NEXT_PUBLIC_MAPBOX_STYLE;
function Earth() {
  const homePageMapREF = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [zoom, setZoom] = useState(0);
  function ResizeEarth(e) {
    // console.log("resi neff", homePageMapREF);
    // let map = homePageMapREF?.current;
    // if (map) {
    //   const { width, height } = map?.getContainer().getBoundingClientRect();
    //   const minDimension = Math.min(width, height);
    //   const topLeft = map
    //     .unproject({
    //       x: 0.5 * (width - minDimension),
    //       y: 0.5 * (height - minDimension),
    //     })
    //     .toArray();
    //   const bottomRight = map
    //     .unproject({
    //       x: 0.5 * (width + minDimension),
    //       y: 0.38 * (height + minDimension),
    //     })
    //     .toArray();
    //   map.fitBounds([topLeft, bottomRight]);
    // }
    let container = e?.target?.getCanvasContainer();
    let width = container?.clientWidth;
    if (width <= 350) {
      setZoom(0.3);
    } else if (width <= 400) {
      setZoom(0.5);
    } else if (width <= 450) {
      setZoom(0.7);
    } else if (width <= 500) {
      setZoom(0.9);
    } else if (width <= 550) {
      setZoom(1.1);
    } else if (width <= 600) {
      setZoom(1.3);
    } else {
      setZoom(1.5);
    }
  }
  useEffect(() => {
    if (loaded) {
      ResizeEarth();
    }
  }, [loaded]);
  var defaultCenter = [105.008, 21.496];
  return (
    <Fragment>
      <Map
        ref={homePageMapREF}
        projection={"globe"}
        initialViewState={{
          longitude: defaultCenter[0],
          latitude: defaultCenter[1],
          zoom,
        }}
        zoom={zoom}
        mapStyle={"mapbox://styles/vova999/clfhwlaqq007f01s2i8mwl7ew"}
        mapboxAccessToken={accessToken}
        style={{ width: "100%", height: "100%" }}
        fog={{
          color: "rgba(255, 255, 255, 0.2)", // Lower atmosphere
          "horizon-blend": 0.05,
          "high-color": "rgba(36, 92, 223, 0.0)", // Upper atmosphere
          "space-color": "rgba(11, 11, 25, 0)", // Background color
          "star-intensity": 0.6, // Background star brightness (default 0.35 at low zoooms )
        }}
        onLoad={(e) => {
          console.log("e", e.target.getCanvasContainer());
          ResizeEarth(e);
          setLoaded(true);
        }}
        onResize={ResizeEarth}
      >
        <Source
          id="iott_all"
          type="geojson"
          // tiles={[process.env.NEXT_PUBLIC_MAPSOURCE]}
          data={"https://dev.dcarbon.org/api/v1/iots/geojson"}
          // attribution="Show to users"
          cluster={true}
          clusterMaxZoom={14} // Max zoom to cluster points on
          clusterRadius={50} // Radius of each cluster when clustering points (defaults to 50)
        >
          <Layer
            id="clusters"
            type="circle"
            source={"iott_all"}
            filter={["has", "point_count"]}
            paint={{
              "circle-color": [
                "step",
                ["get", "point_count"],
                "#51bbd6",
                100,
                "#f1f075",
                750,
                "#f28cb1",
              ],
              "circle-radius": [
                "step",
                ["get", "point_count"],
                20,
                100,
                30,
                750,
                40,
              ],
            }}
          />

          <Layer
            id="cluster-count"
            type="symbol"
            source={"iott_all"}
            filter={["has", "point_count"]}
            layout={{
              "text-field": ["get", "point_count_abbreviated"],
              "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
              "text-size": 12,
            }}
          />
          <Layer
            id="unclustered-point"
            type="circle"
            source={"iott_all"}
            filter={["!", ["has", "point_count"]]}
            layout={{
              "text-field": ["get", "point_count_abbreviated"],
              "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
              "text-size": 12,
            }}
            paint={{
              "circle-color": "#11b4da",
              "circle-radius": 4,
              "circle-stroke-width": 1,
              "circle-stroke-color": "#fff",
            }}
          />
        </Source>
      </Map>
    </Fragment>
  );
}

export default Earth;
