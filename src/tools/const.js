const imgsDir = (str) => `/imgs/${str}`;
const imgsObject = {
  logo: "Logo.png",
  vector: "Vector.svg",
  CopyButton: "CopyButton.svg",
  Hexagon: "Hexagon.svg",
  Recycle: "Recycle.svg",
  Marker: "Marker.svg",
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
export { imgsDir, imgsObject, listTime, IOT_TYPE };
