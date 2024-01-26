import { useEffect, useState } from "react";
import { IProjectDropdownProps, TProject } from "../types";
import { getDocuments, mapProjectDocument } from "../services";
import { handleChange } from "../helpers";

export const ProjectDropdown = ({
  expense,
  setState,
}: IProjectDropdownProps) => {
  const [dropdownProjects, setDropdownProjects] = useState<TProject[]>([]);

  useEffect(() => {
    getDocuments<TProject>("projects", mapProjectDocument, setDropdownProjects);
  }, []);

  return (
    <>
      <label htmlFor="expenseProjectId">Project:</label>
      <select
        id="expenseProjectId"
        name="expenseProjectId"
        onChange={(e) => handleChange(e, setState)}
        value={expense.expenseProjectId}
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
