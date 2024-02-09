import { Params, useNavigate } from "react-router-dom";
import { TClient } from "../types";
import { UpdateClient } from "./UpdateClient";
import { deleteClientFields } from "../services";
import { useState } from "react";
import { DeleteModal } from "./DeleteModal";

export interface IModelInfoProps<T, U> {
  model: T;
  setModel: React.Dispatch<React.SetStateAction<T>>;
  params: Readonly<Params<string>>;
  secondModel?: U;
}

export const ClientInfo = ({
  model,
  setModel,
  params,
}: IModelInfoProps<TClient, undefined>) => {
  const navigate = useNavigate();
  const [toggleDelete, setToggleDelete] = useState(false);
  return (
    <div className="flex flex-col justify-center">
      <div className="mb-2 flex items-center">
        <p className="mr-4 text-4xl font-bold text-gray-800">
          {model.clientFirstName} {model.clientLastName}
        </p>
        {model.clientLastName !== "" && (
          <UpdateClient params={params} model={model} setFunction={setModel} />
        )}
      </div>
      <div className="flex">
        <div className="mr-4">
          <p className="text-gray-600">{model.clientAddress.addressLabel}</p>
          <p className="text-gray-600">{model.clientPhone}</p>
          <p className="text-gray-600">{model.clientEmail}</p>
          <button
            className="inline-block text-red-500 hover:text-red-700"
            onClick={() => setToggleDelete(true)}
          >
            Delete Client
          </button>
          {toggleDelete && (
            <DeleteModal
              onCancel={() => setToggleDelete(false)}
              documentType="client"
              confirmationString={model.id as string}
              collectionName="clients"
              params={params}
              deleteFieldsFunction={deleteClientFields}
              navigate={navigate}
              navigateUrl="/allclients"
            />
          )}
        </div>
      </div>
    </div>
  );
};
