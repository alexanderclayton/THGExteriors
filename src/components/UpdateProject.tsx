import { useState } from "react";
import { TProject, IUpdateModelProps } from "../types";
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

  return (
    <ProjectForm
      legend="Update Project"
      model={updatedProject}
      setState={setUpdatedProject}
      submit="update!"
      params={params}
      update={update}
      setUpdate={setUpdate}
      setUpdatedState={setFunction}
      formType="update"
    />
  );
};
