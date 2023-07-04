import { Layer, Source } from "react-map-gl";
import { layer_1, layer_2 } from "./libs";

function MySource() {
  return (
    <Source
      id="iott_all"
      type="vector"
      tiles={[process.env.NEXT_PUBLIC_MAPSOURCE]}
      attribution="Show to users"
    >
      <Layer {...layer_1} />
      <Layer {...layer_2} />
    </Source>
  );
}
export default MySource;
