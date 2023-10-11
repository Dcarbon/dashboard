import { useEffect, useState } from "react";
import { Map } from "react-map-gl";
import OverView from "./overview";
import { useDispatch } from "react-redux";
import { SensorsACT } from "src/redux/actions/sensorsAction";
import { useRouter } from "next/router";
import SourceVector from "./SourceVector";
import SourceGeojson from "./SourceGeojson";
import Error from "../Error";
//
//
//
//
const layers = ["boundaryLayer", "hexagonLayer"];
const clusters = ["clusters", "cluster-count"];
const accessToken = process.env.NEXT_PUBLIC_MAPBOX_STYLE;
function MapBoxPage({
  mymap,
  Available_features,
  setMymap,
  className,
  setFeatures,
  setIotSelected,
  errFlyTo,
  setErrFlyTo,
}) {
  // dev
  var defaultCenter = [105.008, 16.196];
  var defaultZoom = 4.8;
  // prod
  // var defaultCenter = [105.79, 21.147];
  // var defaultZoom = 8
  const [currentZoom, setCurrentZoom] = useState(null);
  const dispatch = useDispatch();
  const { query, push } = useRouter();

  useEffect(() => {
    const handleResize = () => mymap?.resize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mymap]);

  const Flyto = (center, zoom) => {
    if (mymap) {
      try {
        mymap?.flyTo({
          center: center,
          zoom: zoom,
        });
      } catch (error) {
        setErrFlyTo(true);
        console.error("Coordinates is invalid", error);
      }
    }
  };
  // bản đồ phóng to khi tải trang
  // bản đồ phóng to khi tải trang
  // bản đồ phóng to khi tải trang
  // bản đồ phóng to khi tải trang
  const HANDLE_FLY_on_load = (newQuery) => {
    console.log("HANDLE_FLY_on_load", HANDLE_FLY_on_load);
    let newZoom = defaultZoom;
    let newCenter = [];

    // fly to iot
    //    setIotSelected()
    if (newQuery?.iot) {
      setIotSelected(query.iot);
    }
    //    nếu có cả features => lấy thông tin iot => fly to
    if (newQuery?.iot && Available_features) {
      const findIot = Available_features.find(
        (item) => Number(item.properties.id) === Number(newQuery?.iot)
      );
      newCenter = findIot?.geometry?.coordinates;
      newZoom = 13;
    }

    // fly to lat - lng nếu có latlng
    else if (query?.lng && query?.lat) {
      newCenter = [query?.lng, query?.lat];
      newZoom = query?.zoom;
    }
    setCurrentZoom(newZoom);
    Flyto(newCenter?.length > 0 ? newCenter : defaultCenter, newZoom);

    setIotSelected(query?.iot);
  };
  // HANDLE_HOVER
  // HANDLE_HOVER
  // HANDLE_HOVER
  const HANDLE_HOVER = (hover, id) => {
    mymap.setFeatureState(
      {
        source: "iott_all_2",
        id: id,
        sourceLayer: "boundary",
      },
      { hover }
    );
    mymap.setFeatureState(
      {
        source: "iott_all_2",
        id: id,
        sourceLayer: "hexagon",
      },
      { hover }
    );
  };
  // click node -> chuyển trạng thái current iot
  // click node -> chuyển trạng thái current iot
  // click node -> chuyển trạng thái current iot
  // click node -> chuyển trạng thái current iot
  const HANDLE_CLICK_CLUSTERS = () => {
    let newZoom = defaultZoom;
    mymap.on("click", clusters, (e) => {
      const features = mymap.queryRenderedFeatures(e.point, {
        layers: ["clusters"],
      });
      const clusterId = features[0]?.properties.cluster_id;
      if (features?.length > 0) {
        mymap
          .getSource("iott_all")
          .getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) return;
            newZoom = zoom;
            mymap.flyTo({
              center: features[0].geometry.coordinates,
              zoom: zoom,
            });
            setCurrentZoom(newZoom);
          });
      } else if (e?.lngLat) {
        newZoom = 11.4;
        mymap.flyTo({
          center: [e.lngLat?.lng, e.lngLat?.lat],
          zoom: newZoom,
        });
        setCurrentZoom(newZoom);
      }
    });
  };
  // tải dữ liệu mới theo iot id
  const HANDLE_LOAD_DATA = (id) => {
    setIotSelected(id);
    push("/dashboard?iot=" + id);
    dispatch({
      type: SensorsACT.GET_SENSORS.REQUEST,
      payload: { skip: 0, limit: 50, iotId: id },
    });
  };
  return (
    <div className={className}>
      <Map
        optimizeForTerrain
        ref={setMymap}
        initialViewState={{
          longitude: defaultCenter[0],
          latitude: defaultCenter[1],
          zoom: 4,
        }}
        maxZoom={14}
        minZoom={2}
        // style={{
        //   width: "100%",
        //   height: "100%",
        // }}
        pitch={0}
        projection={"globe"}
        mapStyle="mapbox://styles/vova999/clfhwlaqq007f01s2i8mwl7ew"
        fog={{
          color: "rgba(169, 200, 232, 0.5)", // Lower atmosphere
          "horizon-blend": 0.03,
          "high-color": "rgba(36, 92, 223, 0.7)", // Upper atmosphere
          "space-color": "rgb(11, 11, 25)", // Background color
          "star-intensity": 0.6, // Background star brightness (default 0.35 at low zoooms )
        }}
        mapboxAccessToken={accessToken}
        onZoomEnd={(e) => setCurrentZoom(e.viewState.zoom)}
        onLoad={() => {
          // khi tải trang
          const newQuery = query;
          // check query and fly
          // check query and fly
          // check query and fly
          HANDLE_FLY_on_load(newQuery);

          let HANDLE_IOT_Group = (features) => {
            const newFeatures = features?.map((item) => Number(item.id));
            return newFeatures.filter(
              (item, index) => newFeatures.indexOf(Number(item)) === index
            );
          };

          let hovered = null;
          let actived = null;
          let features_onClick = null;
          if (newQuery?.iot) {
            let newIotId = Number(newQuery?.iot);
            actived = newIotId;
            HANDLE_HOVER(true, newIotId);
            HANDLE_LOAD_DATA(newIotId);
          }
          HANDLE_CLICK_CLUSTERS();

          mymap.on("mousemove", layers, (e) => {
            if (e.features) {
              const id = Number(e.features[0].id);
              hovered = id;
              HANDLE_HOVER(true, id);
            }
          });

          mymap.on("mouseleave", layers, () => {
            if (Number(hovered) !== Number(actived)) {
              HANDLE_HOVER(false, hovered);
            }
            hovered = null;
          });

          // on Chooose
          // on Chooose
          // on Chooose

          mymap.on("click", layers, (e) => {
            if (e.features.length > 0) {
              features_onClick = HANDLE_IOT_Group(e.features);
              setFeatures(features_onClick);

              if (!features_onClick.includes(actived)) {
                HANDLE_HOVER(false, actived);
                const newClickID = Number(e.features[0].id);
                actived = newClickID;
                HANDLE_LOAD_DATA(newClickID);
              }
            }
          });
        }}
        onRender={(event) => event.target.resize()}
      >
        {/* Hiển thị tổng số nodes */}
        {/* Hiển thị tổng số nodes */}
        {/* Hiển thị tổng số nodes */}
        {/* Hiển thị tổng số nodes */}
        <OverView />
        {/* Hiển thị node hoặc clusters theo zoom */}
        {/* Hiển thị node hoặc clusters theo zoom */}
        {/* Hiển thị node hoặc clusters theo zoom */}
        <SourceGeojson visibility={Boolean(currentZoom < 10)} />
        <SourceVector visibility={Boolean(currentZoom >= 10)} />
      </Map>
      <Error
        err={errFlyTo ? "This Coordinate is invalid" : ""}
        clearErrType={setErrFlyTo}
      />
    </div>
  );
}

export default MapBoxPage;
