import BoxTabGenerator from "./Box";

function BiomassGenerator({ id, isActive, handleClick }) {
  return (
    <BoxTabGenerator
      title={"Biomass"}
      isActive={isActive}
      handleClick={handleClick}
      unit={"carbon"}
    />
  );
}

export default BiomassGenerator;
