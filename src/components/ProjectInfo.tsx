import { useNavigate } from "react-router-dom";
import { deleteProjectFields } from "../services";
import { TClient, TProject } from "../types";
import { UpdateProject } from "./UpdateProject";
import { IModelInfoProps } from "./ClientInfo";
import { useState } from "react";
import { DeleteModal } from "./DeleteModal";

export const ProjectInfo = ({
  model,
  setModel,
  params,
  secondModel,
}: IModelInfoProps<TProject, TClient>) => {
  const navigate = useNavigate();
  const [toggleDelete, setToggleDelete] = useState(false);

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
      <div className="flex flex-wrap">
        {secondModel && (
          <>
            <div className="mr-4 w-full lg:w-1/2">
              <p className="text-gray-600">
                <strong>Client:</strong> {secondModel.clientFirstName}{" "}
                {secondModel.clientLastName}
              </p>
            </div>
            <div className="lg-w-1/2 mb-2 mr-4 w-full">
              <p className="text-gray-600">
                <strong>Address:</strong>{" "}
                {secondModel.clientAddress.formattedAddress}
              </p>
            </div>
          </>
        )}
        <div className="mb-2 mr-4 w-full lg:w-1/2">
          <p className="text-gray-600">
            <strong>Start Date:</strong> {model.projectStartDate.toDateString()}
          </p>
          <p className="text-gray-600">
            <strong>End Date:</strong> {model.projectEndDate.toDateString()}
          </p>
          <p className="text-gray-600">
            <strong>Type:</strong> {model.projectType}
          </p>
          <p className="text-gray-600">
            <strong>Status:</strong> {model.projectStatus}
          </p>
          <p className="text-gray-600">
            <strong>Bid:</strong> {model.projectBid.sent ? "Sent" : "Pending"}{" "}
            {model.projectBid.status} {" $" + model.projectBid.amount}
          </p>
          <p className="text-gray-600">
            <strong>Paid:</strong> {(model.projectPaid && "Yes") || "No"}
          </p>
          <p className="text-gray-600">
            <strong>Payment Type:</strong> {model.projectPaymentType}
          </p>
          <button
            className="inline-block text-red-500 hover:text-red-700"
            onClick={() => setToggleDelete(true)}
          >
            Delete Project
          </button>
          {toggleDelete && (
            <DeleteModal
              onCancel={() => setToggleDelete(false)}
              documentType="project"
              confirmationString={model.id as string}
              collectionName="projects"
              params={params}
              deleteFieldsFunction={deleteProjectFields}
              navigate={navigate}
              navigateUrl="/allprojects"
            />
          )}
        </div>
      </div>
    </div>
  );
};
