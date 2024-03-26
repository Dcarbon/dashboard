import { IOT_HOST, gateway } from "src/redux/handle";

export const Endpoint = {
    GeoJSON: `iot/geojson`,
  };
 export function formatString(template, ...values) {
    return template.replace(/%s/g, () => values.shift());
}