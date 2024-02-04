import { useState } from "react";
import { TProject, IUpdateModelProps } from "../types";
import { ProjectForm } from "./ProjectForm";

export const UpdateProject = ({
  params,
  model,
  setFunction,
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
  const [toggleUpdate, setToggleUpdate] = useState(false);

  return (
    <div>
      {!toggleUpdate && (
        <button onClick={() => setToggleUpdate(!toggleUpdate)}>Update</button>
        // <button onClick={() => console.log(updatedProject)}>Update</button>
      )}
      {toggleUpdate && (
        <ProjectForm
          legend="Update Project"
          model={updatedProject}
          setState={setUpdatedProject}
          submit="update!"
          toggle={toggleUpdate}
          setToggle={setToggleUpdate}
          params={params}
          setUpdatedState={setFunction}
          formType="update"
        />
      )}
    </div>
  );
};
