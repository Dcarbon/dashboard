import BoxTabGenerator from "./Box";

function BiogasGenerator({ id, isActive, handleClick }) {
  return (
    <BoxTabGenerator
      title={"Biogas"}
      isActive={isActive}
      handleClick={handleClick}
      unit={"carbon"}
    />
  );
}

export default BiogasGenerator;
