import { useState } from "react";
import { TProject, IUpdateProjectProps } from "../types";
import { mapProjectDocument, updateDocument } from "../services";
import { ProjectForm } from "./ProjectForm";
import { setProjectData } from "../helpers";

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
    projectType: project.projectType,
    notes: project.notes,
    imageUrl: project.imageUrl,
  });

  const formSubmit = (e: React.FormEvent, image: any) => {
    e.preventDefault();
    updateDocument<TProject>(
      "projects",
      params,
      updatedProject,
      mapProjectDocument,
      setProjectData,
      setProject,
      setUpdate,
      update,
      image,
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
