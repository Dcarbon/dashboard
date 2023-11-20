import { useProjectMinted } from "src/hook/useDashboard";

function Total() {
  const total = useProjectMinted();
  console.log("total", total);
  return (
    <div className="inline-block border-2 border-primary rounded-full px-5 py-2 mb-6">
      Total carbon credit earned{" "}
      <span className="text-primary text-T-M leading-T-M">
        {/* {projectTotal ? handleTotalCarbon(projectTotal) : 0} */}
      </span>
    </div>
  );
}

export default Total;
