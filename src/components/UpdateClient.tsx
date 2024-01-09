import { useState } from "react";
import { TClient, IUpdateClientProps } from "../types";
import { updateDocument } from "../services";
import { ClientForm } from "./ClientForm";

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
    updateDocument(
      "clients",
      params,
      updatedClient,
      setClient,
      setUpdate,
      update,
    );
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
