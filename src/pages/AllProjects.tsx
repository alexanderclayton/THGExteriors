import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TProject } from "../types";
import { getProjects } from "../services";

export const AllProjects = () => {
  const navigate = useNavigate();
  const [allProjects, setAllProjects] = useState<TProject[]>([]);

  useEffect(() => {
    getProjects(setAllProjects);
  }, []);

  return (
    <div>
      <p>Projects</p>
      {allProjects.map((project) => (
        <div
          key={project.id}
          className="border border-black hover:cursor-pointer"
          onClick={() => navigate(`/project/${project.id}`)}
        >
          <p>
            <span className="font-bold">Project Name: </span>{" "}
            {project.projectName}
          </p>
          <p>
            <span className="font-bold">Project Date: </span>{" "}
            {project.projectDate}
          </p>
        </div>
      ))}
    </div>
  );
};
