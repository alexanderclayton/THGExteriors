import { useState } from "react";
import { TClient } from "../types";
import { Params } from "react-router";
import { updateClient } from "../services";
import { ClientForm } from "./ClientForm";

interface IUpdateClientProps {
  params: Readonly<Params<string>>;
  client: TClient;
  setClient: React.Dispatch<React.SetStateAction<TClient>>;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  update: boolean;
}

export const UpdateClient: React.FC<IUpdateClientProps> = ({
  params,
  client,
  setClient,
  setUpdate,
  update,
}) => {
  const [updatedClient, setUpdatedClient] = useState<TClient>({
    name: client.name,
    phone: client.phone,
    email: client.email,
    address: client.address,
    imageUrl: client.imageUrl,
  });

  const formSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateClient(params, updatedClient, setClient, setUpdate, update);
  };

  return (
    <div>
      <ClientForm
        legend="Update Client Information"
        setState={setUpdatedClient}
        formSubmit={formSubmit}
        client={updatedClient}
        submit="Update"
      />
    </div>
  );
};
