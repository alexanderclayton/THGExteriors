import { Params, useNavigate } from "react-router-dom";
import { TClient } from "../types";
import { UpdateClient } from "./UpdateClient";
import { deleteClientFields, deleteDocument } from "../services";
import { FaRegImage } from "react-icons/fa6";

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
            onClick={() =>
              deleteDocument(
                "clients",
                params,
                deleteClientFields,
                navigate,
                "/allclients",
              )
            }
            className="text-red-500 hover:text-red-700"
          >
            Delete Client
          </button>
        </div>
        <div>
          {model.imageUrl === "" ? (
            <FaRegImage size={60} className="text-gray-400" />
          ) : (
            <img
              src={model.imageUrl}
              alt="client home exterior"
              className="h-32 w-32 rounded-md object-cover shadow-md"
            />
          )}
        </div>
      </div>
    </div>
  );
};