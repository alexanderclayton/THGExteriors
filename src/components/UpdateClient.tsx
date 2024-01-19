import { useState } from "react";
import { TClient, IUpdateClientProps } from "../types";
import { ClientForm } from "./ClientForm";
import { mapClientDocument, updateDocument } from "../services";
import { setClientData } from "../helpers";

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
    notes: client.notes,
    imageUrl: client.imageUrl,
  });

  const formSubmit = (e: React.FormEvent, image: any) => {
    e.preventDefault();
    updateDocument<TClient>(
      "clients",
      params,
      updatedClient,
      mapClientDocument,
      setClientData,
      setClient,
      setUpdate,
      update,
      image,
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
