import { Layer, Source } from "react-map-gl";
function SourceGeojson() {
  return (
    <Source
      id="iott_all"
      type="geojson"
      data={"https://dev.dcarbon.org/api/v1/iots/geojson"}
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
          "circle-color": "#72bf44",
          "circle-radius": [
            "step",
            ["get", "point_count"],
            20,
            100,
            30,
            750,
            40,
          ],
          "circle-stroke-width": 1,
          "circle-stroke-color": "#66d622",
        }}
      />

      <Layer
        id="cluster-count"
        type="symbol"
        source={"iott_all"}
        filter={["has", "point_count"]}
        layout={{
          "text-field": ["get", "point_count_abbreviated"],
          "text-size": 20,
        }}
      />
    </Source>
  );
}

export default SourceGeojson;
