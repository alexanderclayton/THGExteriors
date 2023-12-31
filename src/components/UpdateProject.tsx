import { useState } from "react";
import { TProject } from "../types";
import { Params } from "react-router-dom";
import { updateProject } from "../services";

interface IUpdateProjectProps {
  params: Readonly<Params<string>>;
  project: TProject;
  setProject: React.Dispatch<React.SetStateAction<TProject>>;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  update: boolean;
}

export const UpdateProject: React.FC<IUpdateProjectProps> = ({
  params,
  project,
  setProject,
  setUpdate,
  update,
}) => {
  const [updatedProject, setUpdatedProject] = useState<TProject>({
    clientId: project.clientId,
    projectName: project.projectName,
    projectDate: project.projectDate,
    paid: project.paid,
    imageUrl: project.imageUrl,
  });

  const handleUpdateProjectChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { id, value } = e.target;
    setUpdatedProject((prevProject) => ({
      ...prevProject,
      [id]: value,
    }));
  };

  return (
    <div>
      <label htmlFor="projectName">Project Name</label>
      <input
        type="text"
        id="projectName"
        onChange={handleUpdateProjectChange}
        value={updatedProject.projectName}
      />
      <label htmlFor="projectDate">Project Date</label>
      <input
        type="text"
        id="projectDate"
        onChange={handleUpdateProjectChange}
        value={updatedProject.projectDate}
      />
      <button onClick={() => console.log(updatedProject)}>Check</button>
      <button
        onClick={() =>
          updateProject(params, updatedProject, setProject, setUpdate, update)
        }
      >
        Update Project in Firebase
      </button>
    </div>
  );
};
