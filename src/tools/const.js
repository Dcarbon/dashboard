import BigNumber from "bignumber.js";
import { CMS_HOST } from "src/redux/handle";

const filesDir = (str) => `/files/${str}`;
const imgsDir = (str) => `/imgs/${str}`;
const imgsObject = {
  logo: "Logo.png",
  vector: "Vector.svg",
  CopyButton: "CopyButton.svg",
  Hexagon: "Hexagon.svg",
  Recycle: "Recycle.svg",
  Marker: "Marker.svg",
  phone_icon: "phone_icon.svg",
  location_icon: "location_icon.svg",
  Laptop_1: "Laptop_1.png",
  Cloud_1: "Cloud_1.png",
  mechanical_1: "mechanical_1.png",
  mechanical_2: "mechanical_2.png",
  mechanical_3: "mechanical_3.png",
  Hexagon: "Hexagon.png",
  Manifesto: "Manifesto.svg",
  Whitepaper: "White-paper.svg",
  home: {
    banner: "home/banner.png",
    banner05x: "home/banner@0.5x.png",
    banner2x: "home/banner@2x.png",
  },
  home_banner2: "home_banner2.png",
  home_banner_discover: "home_banner_discover.png",
  Contact: "contact.png",
  Circle: "3dCircle.svg",
  Polygon_1: "3dPolygon_1.svg",
  Polygon_2: "3dPolygon_2.svg",
  Cube: "3dCube.svg",
  Earth: "3dEarth.svg",
  project_img_1: "project_img_1.jpg",
  project_img_2: "project_img_2.jpg",
  project_img_3: "project_img_3.png",
  project_img_4: "project_img_4.png",
  coming_soon: "bg_comingsoon.jpg",
  image_coming_soon: "icon_comingsoon.png",
  Download: "download.png",
  Earths: {
    NormalMap: "maps/8k_earth_normal_map.jpg",
    DayMap: "maps/2k_earth_daymap.jpg",
    Clouds: "maps/2k_earth_clouds.jpg",

    DayMap_quality_low: "maps/low_quality__earth_daymap.jpg",
    Clouds_quality_low: "maps/low_quality__earth_clouds.jpg",

    NightMap: "maps/8k_earth_nightmap.jpg",
    SpecularMap: "maps/8k_earth_specular_map.jpg",
    BumpMap: "maps/8k_earth_bump_map.jpg",
  },
  howdoesitwork: {
    banner: "howdoesitwork/banner.png",
    polygon: "howdoesitwork/Polygon.png",
    circle: "howdoesitwork/Circle.png",
  },
  Solution: {
    biogas: "solution/biogas.png",
    energy: "solution/energy.png",
    stove: "solution/stove.png",
  },
  DDAO: {
    banner: "DDAO/banner.png",
    vision: "DDAO/ourVision.png",
    goal: "DDAO/ourGoal.png",
    foundation: "DDAO/foundation.png",
  },
  blog: {
    banner: "blog/banner.png",
  },
};

const listTime = ["7 days", "1 month", "1 year"];

export const SENSOR__TYPE = {
  None: 0,
  Flow: 1,
  Power: 2,
  GPS: 3,
  Thermometer: 4,
  Biogas: 21,
  Biomass: 41,
};
export const SENSOR__TYPE_TEXT = {
  0: "None",
  1: "Flow",
  2: "Energy",
  21: "Biogas",
  3: "GPS",
  4: "Temperature",
  41: "Biomass",
};

export const DEVICE__STATUS = {
  Reject: -1,
  Register: -0,
  Success: 10,
};
export const DEVICE__STATUS_TEXT = {
  "-1": "Reject",
  "-0": "Register",
  10: "Success",
};

export const IOT__TYPE = {
  None: 0,
  WindPower: 10,
  SolarPower: 11,
  BurnMethane: 20,
  CleanCockstove: 21, //BurnBiomass
  Fertilizer: 30,
  Trash: 31,
};
export const IOT__TYPE_TEXT = {
  10: "Wind Power",
  11: "Solar Power",
  20: "Burn Methane",
  21: "Clean Cockstove",
  30: "Fertilizer",
  31: "Trash",
};
function hexToString(hex) {
  var string = "";

  // Remove the leading "0x" if present
  if (hex.slice(0, 2) === "0x") {
    hex = hex.slice(2);
  }

  // Convert each pair of characters to decimal and then to a character
  for (var i = 0; i < hex.length; i += 2) {
    var decimal = parseInt(hex.substr(i, 2), 16);
    string += String.fromCharCode(decimal);
  }

  return string;
}
function configHexAmount(amount) {
  const hexAmount = new BigNumber(amount);
  const reduceAmount = hexAmount.div("1e9");
  let fixed = reduceAmount.toFixed(2);

  return fixed;
}
const handleAttributes = (res) =>
  res?.attributes ?? res?.data?.attributes ?? null;
const handleMeta = (res) => res?.meta ?? res?.data?.meta;
const handleImage = (res) => {
  let url = res?.src ?? res?.url ?? res?.attributes?.url;
  if (!url) {
    return "/not_found/no-image.jpg";
  }
  return CMS_HOST + url;
};
export {
  imgsDir,
  filesDir,
  imgsObject,
  listTime,
  hexToString,
  handleAttributes,
  handleMeta,
  handleImage,
  configHexAmount,
};
