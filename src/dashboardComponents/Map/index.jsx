import * as React from "react";
// eslint-disable-next-line no-unused-vars
import Map, { MapboxEvent } from "react-map-gl";
import { MapInitProperties } from "src/constants/mapbox";
import Header from "../Header";
import ScrollBox from "src/components/ui/ScrollBox";

/**
 * @param {MapboxEvent} evnt
 * @returns
 */
export default function DashboardMap() {
  return (
    <div className="flex flex-col w-screen h-screen relative bg-extended-900">
      <div className="px-6 py-4">
        <Header />
      </div>
      <div className="flex-1">
        <Map
          {...MapInitProperties}
          onLoad={() => {
            console.log("onLoad evnt");
          }}
          onResize={() => {
            console.log("onResize evnt");
          }}
        />
      </div>
      <div className="absolute bottom-0 left-0 w-full max-h-3/4">
        <ScrollBox></ScrollBox>
      </div>
    </div>
  );
}
