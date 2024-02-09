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
        className="w-full rounded-md border border-primary-500 bg-accent-100 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
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
