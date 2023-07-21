import { Layer, Source } from "react-map-gl";

function SourceVector({ visibility }) {
  return (
    <Source
      id='iott_all_2'
      type='vector'
      tiles={[process.env.NEXT_PUBLIC_MAPSOURCE]}
      // attribution="Show to users"
    >
      <Layer
        id={"boundaryLayer"}
        type='line'
        source={"iott_all"}
        source-layer='boundary'
        layout={{
          // Make the layer visible by default.
          visibility: visibility ? "visible" : "none",
          "line-cap": "round",
        }}
        paint={{
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
        }}
      />
      <Layer
        id={"hexagonLayer"}
        type={"fill"}
        source={"iott_all"}
        source-layer={"hexagon"}
        layout={{
          visibility: visibility ? "visible" : "none",
        }}
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
