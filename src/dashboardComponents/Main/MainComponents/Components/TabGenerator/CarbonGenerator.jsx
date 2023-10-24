import BoxTabGenerator from "./Box";

function CarbonGenerator({ isActive, handleClick }) {
  return (
    <BoxTabGenerator
      title={"Carbon minted"}
      isActive={isActive}
      handleClick={handleClick}
      unit={"carbon"}
    />
  );
}

export default CarbonGenerator;
