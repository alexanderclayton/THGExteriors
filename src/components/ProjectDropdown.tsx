import { useEffect, useState } from "react";
import { TExpense, TProject } from "../types";
import { getDocuments, mapProjectDocument } from "../services";
import { handleChange, setAllProjectsDocs } from "../helpers";

interface IProjectDropdownProps {
  expense: TExpense;
  setState: React.Dispatch<React.SetStateAction<TExpense>>;
}

export const ProjectDropdown: React.FC<IProjectDropdownProps> = ({
  expense,
  setState,
}) => {
  const [dropdownProjects, setDropdownProjects] = useState<TProject[]>([]);

  useEffect(() => {
    getDocuments<TProject>(
      "projects",
      mapProjectDocument,
      setAllProjectsDocs,
      setDropdownProjects,
    );
  }, []);

  return (
    <>
      <label htmlFor="projectId">Project:</label>
      <select
        id="projectId"
        name="projectId"
        onChange={(e) => handleChange(e, setState)}
        value={expense.projectId}
      >
        <option value=""></option>
        {dropdownProjects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.projectName}
          </option>
        ))}
      </select>
    </>
  );
};
