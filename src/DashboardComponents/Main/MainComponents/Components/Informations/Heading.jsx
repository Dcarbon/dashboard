import { useProject } from "src/hook/useProject";

function Heading() {
  const [project] = useProject();  
  return (
    <div className="mb-8">
      <h3 className="text-white text-H-S leading-H-S mb-3">
         {project?.descs?.[0].name}
      </h3>
      <h4 className="text-white text-B-M leading-B-M">
        {project?.descs?.[0].desc}
      </h4>
    </div>
  );
}

export default Heading;
