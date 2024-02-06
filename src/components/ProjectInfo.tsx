//import//

import { useNavigate } from "react-router-dom";
import { deleteDocument, deleteProjectFields } from "../services";
import { TProject } from "../types";
import { UpdateProject } from "./UpdateProject";
import { IModelInfoProps } from "./ClientInfo";

export const ProjectInfo = ({
  model,
  setModel,
  params,
}: IModelInfoProps<TProject>) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center">
      <div className="mb-2 flex items-center">
        <p className="mr-4 text-4xl font-bold text-gray-800">
          {model.projectName}
        </p>
        {model.projectClientId !== "" && (
          <UpdateProject params={params} model={model} setFunction={setModel} />
        )}
      </div>
      <div className="flex">
        <div className="mr-4">
          <p className="text-gray-600">{model.projectClientId}</p>
          <p className="text-gray-600">
            {model.projectStartDate.toDateString()}
          </p>
          <p className="text-gray-600">{model.projectEndDate.toDateString()}</p>
          <p className="text-gray-600">{model.projectType}</p>
          <p className="text-gray-600">{model.projectStatus}</p>
          <p className="text-gray-600">
            {model.projectBid.sent} {model.projectBid.status}{" "}
            {model.projectBid.amount}
          </p>
          <p className="text-gray-600">{model.projectPaid}</p>
          <p className="text-gray-600">{model.projectPaymentType}</p>
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
        </div>
      </div>
    </div>
  );
};
