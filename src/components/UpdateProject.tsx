import { useState } from "react";
import { TProject, IUpdateModelProps } from "../types";
import { mapProjectDocument, updateDocument } from "../services";
import { ProjectForm } from "./ProjectForm";

export const UpdateProject = ({
  params,
  model,
  setFunction,
  setUpdate,
  update,
}: IUpdateModelProps<TProject>) => {
  const [updatedProject, setUpdatedProject] = useState<TProject>({
    clientId: model.clientId,
    projectName: model.projectName,
    projectStartDate: model.projectStartDate,
    projectEndDate: model.projectStartDate,
    paid: model.paid,
    bid: model.bid,
    projectType: model.projectType,
    projectStatus: model.projectStatus,
    notes: model.notes,
    imageUrl: model.imageUrl,
  });

  const formSubmit = (e: React.FormEvent, image: File | undefined) => {
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
