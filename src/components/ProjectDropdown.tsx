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
