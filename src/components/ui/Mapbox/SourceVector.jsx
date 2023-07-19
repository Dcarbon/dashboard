import { Layer, Source } from "react-map-gl";
import { layer_1, layer_2 } from "./libs";

function SourceVector() {
  return (
    <Source
      id="iott_all_2"
      type="vector"
      tiles={[process.env.NEXT_PUBLIC_MAPSOURCE]}
      // attribution="Show to users"
    >
      <Layer {...layer_1} />
      <Layer
        {...layer_2}
        paint={{
          "fill-color": "#72BF44",
          "fill-antialias": false,
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            0.9,
            0.6,
          ],
        }}
      />
    </Source>
  );
}

export default SourceVector;
