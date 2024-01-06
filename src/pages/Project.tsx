//import//
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TProject } from "../types";
import { getProject, deleteProject } from "../services";
import { UpdateProject } from "../components/UpdateProject";

export const Project = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<TProject>({
    clientId: "",
    projectName: "",
    projectDate: "",
    paid: false,
  });
  const [update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    getProject(params, setProject);
  }, []);

  return (
    <div>
      <div>
        <p>{project.projectDate}</p>
        <p>{project.projectName}</p>
      </div>
      <button onClick={() => setUpdate(!update)}>Update</button>
      {update && (
        <UpdateProject
          params={params}
          project={project}
          setProject={setProject}
          setUpdate={setUpdate}
          update={update}
        />
      )}
      <button onClick={() => deleteProject(params, navigate)}>Delete</button>
    </div>
  );
};
