import { useEffect, useState } from "react";
import { TExpense, TProject } from "../types";
import { getDocuments, mapProjectDocument } from "../services";
import { handleChange } from "../helpers";

interface IProjectDropdownProps {
  expense: TExpense;
  setState: React.Dispatch<React.SetStateAction<TExpense>>;
}

export const ProjectDropdown: React.FC<IProjectDropdownProps> = ({
  expense,
  setState,
}) => {
  const [projects, setProjects] = useState<TProject[]>([]);

  useEffect(() => {
    getDocuments("projects", mapProjectDocument, setProjects);
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
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.projectName}
          </option>
        ))}
      </select>
    </>
  );
};
