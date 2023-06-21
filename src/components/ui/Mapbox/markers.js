import { Fragment, useEffect, useState } from "react";
import { Marker } from "react-map-gl";
import DcarbonAPI from "src/tools/hook";
import IconSvg from "../IconSvg";
import { imgsObject } from "src/tools/const";

function MyMarkers({ mymap }) {
  const [markers, setMarkers] = useState([]);
  useEffect(() => {
    if (!markers?.length) {
      const newHOOk = new DcarbonAPI();
      setMarkers(newHOOk.GetMarker());
    }
  }, [markers]);
  return (
    <Fragment>
      {markers?.map((item, key) => {
        const iconSize = item.properties.iconSize;
        const longitude = item.geometry.coordinates[0];
        const latitude = item.geometry.coordinates[1];
        return (
          <Marker
            style={{ width: iconSize + "px", height: iconSize + "px" }}
            key={"item-" + key}
            longitude={longitude}
            latitude={latitude}
            onClick={() => {
              mymap.flyTo({
                center: [longitude, latitude],
                zoom: 16,
                essential: true, // this animation is considered essential with respect to prefers-reduced-motion
              });
            }}
          >
            <IconSvg img={imgsObject.Marker} width={32} height={32} />
          </Marker>
        );
      })}
    </Fragment>
  );
}

export default MyMarkers;
