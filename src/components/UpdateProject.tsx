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
    projectClientId: model.projectClientId,
    projectName: model.projectName,
    projectStartDate: model.projectStartDate,
    projectEndDate: model.projectEndDate,
    projectPaid: model.projectPaid,
    projectPaymentType: model.projectPaymentType,
    projectBid: model.projectBid,
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
