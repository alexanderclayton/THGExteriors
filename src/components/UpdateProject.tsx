import { useState } from "react";
import { TProject, IUpdateProjectProps } from "../types";
import { mapProjectDocument, updateDocument } from "../services";
import { ProjectForm } from "./ProjectForm";

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
    bid: project.bid,
    imageUrl: project.imageUrl,
  });

  const formSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateDocument(
      "projects",
      params,
      updatedProject,
      mapProjectDocument,
      setProject,
      setUpdate,
      update,
    );
  };

  return (
    <ProjectForm
      legend="Update Project"
      setState={setUpdatedProject}
      formSubmit={formSubmit}
      project={updatedProject}
      submit="update!"
    />
  );
};
