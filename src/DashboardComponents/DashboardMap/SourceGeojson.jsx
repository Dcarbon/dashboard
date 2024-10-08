import { Layer, Source } from "react-map-gl";
import { API } from "src/constants/mapbox";
// eslint-disable-next-line no-unused-vars
import { CirclePaint } from "mapbox-gl";
/**
 *
 * @param {CirclePaint} paint
 * @returns
 */
function SourceGeojson({ visibility }) {
  return (
    <Source
      id="iott_all"
      type="geojson"
      data={API.geojson}
      cluster={true}
      clusterMaxZoom={14} // Max zoom to cluster points on
      clusterRadius={50} // Radius of each cluster when clustering points (defaults to 50)
    >
      <Layer
        id="clusters"
        type="circle"
        source={"iott_all"}
        filter={["has", "point_count"]}
        layout={{
          visibility: visibility ? "visible" : "none",
        }}
        paint={{
          "circle-color": "#72bf44",
          "circle-radius": [
            "step",
            ["get", "point_count"],
            20,
            50,
            30,
            100,
            40,
            200,
            40,
          ],
          "circle-stroke-width": 1,
          "circle-stroke-color": "#66d622",
          "circle-opacity": 0.6,
        }}
      />

      <Layer
        id="cluster-count"
        type="symbol"
        source={"iott_all"}
        filter={["has", "point_count"]}
        layout={{
          "text-field": ["get", "point_count_abbreviated"],
          "text-size": 24,
          "text-padding": 10,
          visibility: visibility ? "visible" : "none",
        }}
        paint={{
          "text-color": "#ffffff",
        }}
      />
      <Layer
        id="unclustered-point"
        type="circle"
        source={"iott_all"}
        filter={["!", ["has", "point_count"]]}
        paint={{
          "circle-color": "#66d622",
          "circle-radius": 10,
          "circle-opacity": 0.6,
        }}
        layout={{
          visibility: visibility ? "visible" : "none",
        }}
      />
    </Source>
  );
}

export default SourceGeojson;
