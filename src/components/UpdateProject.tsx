import { useState } from "react";
import { TProject, IUpdateProjectProps } from "../types";
import { mapProjectDocument, updateDocument } from "../services";

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

  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    const adjustedDate = new Date(
      selectedDate.getTime() + selectedDate.getTimezoneOffset() * 60000,
    );
    return adjustedDate;
  };

  const handleUpdateProjectChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { id, value, name } = e.target;
    const newValue = name === "projectDate" ? new Date(handleDate(e)) : value;
    setUpdatedProject((prevProject) => ({
      ...prevProject,
      [id]: newValue,
    }));
  };

  return (
    <div>
      <label htmlFor="projectName">Project Name</label>
      <input
        type="text"
        id="projectName"
        name="projectName"
        onChange={handleUpdateProjectChange}
        value={updatedProject.projectName}
      />
      <label htmlFor="projectDate">Project Date</label>
      <input
        type="date"
        id="projectDate"
        name="projectDate"
        onChange={handleUpdateProjectChange}
        value={updatedProject.projectDate.toISOString().split("T")[0]}
      />
      <button onClick={() => console.log(updatedProject)}>Check</button>
      <button
        onClick={() =>
          updateDocument(
            "projects",
            params,
            updatedProject,
            mapProjectDocument,
            setProject,
            setUpdate,
            update,
          )
        }
      >
        Update Project in Firebase
      </button>
    </div>
  );
};
