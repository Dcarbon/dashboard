import BoxTabGenerator from "./Box";

function TemporatureGenerator({ id, isActive, handleClick }) {
  return (
    <BoxTabGenerator
      title={"Temporature"}
      isActive={isActive}
      handleClick={handleClick}
      unit={"carbon"}
    />
  );
}

export default TemporatureGenerator;
