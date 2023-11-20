import { useSelector } from "react-redux";

export function useProjectMinted() {
  const res = useSelector(
    (state) => state?.dashboardState?.total_project_minted
  );
  return res;
}
