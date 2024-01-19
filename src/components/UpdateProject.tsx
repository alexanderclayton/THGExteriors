import { useState } from "react";
import { TProject, IUpdateModelProps } from "../types";
import { mapProjectDocument, updateDocument } from "../services";
import { ProjectForm } from "./ProjectForm";

export const UpdateProject: React.FC<IUpdateModelProps<TProject>> = ({
  params,
  model,
  setFunction,
  setUpdate,
  update,
}) => {
  const [updatedProject, setUpdatedProject] = useState<TProject>({
    clientId: model.clientId,
    projectName: model.projectName,
    projectDate: model.projectDate,
    paid: model.paid,
    bid: model.bid,
    projectType: model.projectType,
    notes: model.notes,
    imageUrl: model.imageUrl,
  });

  const formSubmit = (e: React.FormEvent, image: any) => {
    e.preventDefault();
    updateDocument<TProject>(
      "projects",
      params,
      updatedProject,
      mapProjectDocument,
      setFunction,
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
      model={updatedProject}
      submit="update!"
    />
  );
};
