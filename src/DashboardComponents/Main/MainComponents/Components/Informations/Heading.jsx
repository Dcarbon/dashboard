import { useProjectInformation } from "src/DashboardComponents/handleData";

function Heading() {
  const projectInformation = useProjectInformation();
  return (
    <div className="mb-8">
      <h3 className="text-white text-H-S leading-H-S mb-3">
        {projectInformation?.descs[0].name}
      </h3>
      <h4 className="text-white text-B-M leading-B-M">
        {projectInformation?.descs[0].desc}
      </h4>
    </div>
  );
}

export default Heading;
