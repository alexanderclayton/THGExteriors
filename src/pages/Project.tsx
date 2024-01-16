//import//
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TProject, BidStatus, ProjectType, TClient } from "../types";
import {
  getDocument,
  deleteDocument,
  deleteProjectFields,
  mapProjectDocument,
} from "../services";
import { UpdateProject } from "../components/UpdateProject";
import { Notes } from "../components/Notes";

export const Project = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<TProject>({
    clientId: "",
    projectName: "",
    projectDate: new Date(),
    paid: false,
    bid: { sent: false, status: BidStatus.Tentative, amount: 0 },
    projectType: ProjectType.Other,
    notes: [],
    imageUrl: "",
  });

  const [update, setUpdate] = useState<boolean>(false);

  const setProjectData = (data: TProject) => {
    setProject(data);
  };

  useEffect(() => {
    getDocument("projects", params, mapProjectDocument, setProjectData);
  }, []);

  return (
    <div>
      <div>
        <p>{project.projectDate.toDateString()}</p>
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
      <button
        onClick={() =>
          deleteDocument(
            "projects",
            params,
            deleteProjectFields,
            navigate,
            "/allprojects",
          )
        }
      >
        Delete
      </button>
      <Notes
        model={project}
        collectionName="projects"
        params={params}
        mapFunction={mapProjectDocument}
        setState={
          setProject as React.Dispatch<React.SetStateAction<TClient | TProject>>
        }
      />
      {project.imageUrl === undefined ? (
        <p>No Project Image</p>
      ) : (
        <img src={project.imageUrl} alt="project exterior" />
      )}
    </div>
  );
};
