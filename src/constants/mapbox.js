export const API = {
  geojson: "https://dev.dcarbon.org/api/v1/iots/geojson",
  GGANAS: "https://www.googletagmanager.com/gtag/js?id=",
};
const accessToken = process.env.NEXT_PUBLIC_MAPBOX_STYLE;

const defaultCenter = [105.008, 16.196];
export const MapInitProperties = {
  optimizeForTerrain: true,
  mapboxAccessToken: accessToken,
  initialViewState: {
    longitude: defaultCenter[0],
    latitude: defaultCenter[1],
    zoom: 4,
  },
  pitch: 0,
  projection: "globe",
  style: { width: "100%", height: "100%" },
  mapStyle: "mapbox://styles/vova999/clfhwlaqq007f01s2i8mwl7ew",
  fog: {
    color: "rgba(169, 200, 232, 0.5)", // Lower atmosphere
    "horizon-blend": 0.03,
    "high-color": "rgba(36, 92, 223, 0.7)", // Upper atmosphere
    "space-color": "rgb(11, 11, 25)", // Background color
    "star-intensity": 0.6, // Background star brightness (default 0.35 at low zoooms )
  },
};
