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
  home_banner: "home_banner.png",
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

  Earths: {
    NormalMap: "maps/8k_earth_normal_map.jpg",
    DayMap: "maps/2k_earth_daymap.jpg",
    Clouds: "maps/2k_earth_clouds.jpg",
    NightMap: "maps/8k_earth_nightmap.jpg",
    SpecularMap: "maps/8k_earth_specular_map.jpg",
    BumpMap: "maps/8k_earth_bump_map.jpg",
  },
  HDIW: {
    banner: "HDIW/banner.png",
    polygon: "HDIW/Polygon.png",
    circle: "HDIW/Circle.png",
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
};

const listTime = ["7 days", "1 month", "1 year"];
const IOT_TYPE = (val) => {
  switch (val) {
    case 10:
      return "Wind Power";
    case 11:
      return "Solar Power";
    case 20:
      return "Burn Methane";
    case 30:
      return "Fertilizer";
    case 31:
      return "Trash";
    default:
      return "None";
  }
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

export { imgsDir, filesDir, imgsObject, listTime, IOT_TYPE, hexToString };
