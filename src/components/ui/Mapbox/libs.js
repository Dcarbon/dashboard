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
export { layer_1, layer_2 };
