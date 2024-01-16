//import//
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TProject, BidStatus, ProjectType } from "../types";
import {
  getDocument,
  deleteDocument,
  deleteProjectFields,
  mapProjectDocument,
  updateDocument,
} from "../services";
import { UpdateProject } from "../components/UpdateProject";

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
  const [note, setNote] = useState("");

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
      <div>
        {project.notes !== undefined
          ? project.notes.map((data, index: number) => (
              <div key={index} className="flex">
                <p>{data}</p>
                <button
                  onClick={() =>
                    updateDocument(
                      "projects",
                      params,
                      project,
                      mapProjectDocument,
                      setProject,
                      undefined,
                      undefined,
                      null,
                      note,
                      setNote,
                      index,
                    )
                  }
                >
                  Delete
                </button>
              </div>
            ))
          : null}
      </div>
      <div>
        <label htmlFor="note">Note</label>
        <input
          type="text"
          id="note"
          name="note"
          className="border border-black"
          onChange={(e) => setNote(e.target.value)}
          value={note}
        />
        <button
          onClick={() =>
            updateDocument(
              "projects",
              params,
              project,
              mapProjectDocument,
              setProject,
              undefined,
              undefined,
              null,
              note,
              setNote,
            )
          }
        >
          Add Note
        </button>
      </div>
      {project.imageUrl === undefined ? (
        <p>No Project Image</p>
      ) : (
        <img src={project.imageUrl} alt="project exterior" />
      )}
    </div>
  );
};
