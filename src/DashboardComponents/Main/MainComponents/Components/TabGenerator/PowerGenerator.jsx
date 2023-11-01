import BoxTabGenerator from "./Box";

function PowerGenerator({ id, isActive, handleClick }) {
  console.log("id", id);
  return (
    <BoxTabGenerator
      title={"Electricity generated"}
      isActive={isActive}
      handleClick={handleClick}
      unit={"carbon"}
    />
  );
}

export default PowerGenerator;
