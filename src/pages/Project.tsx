//import//
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TProject } from "../types";
import { getProject } from "../services";

export const Project = () => {
  const params = useParams();
  const [project, setProject] = useState<TProject>({
    clientId: "",
    projectName: "",
    projectDate: "",
    paid: false,
  });

  useEffect(() => {
    getProject(params, setProject);
  }, []);

  return (
    <div>
      <p>{project.projectDate}</p>
      <p>{project.projectName}</p>
    </div>
  );
};
