import { useState } from "react";
import { TClient, IUpdateModelProps } from "../types";
import { ClientForm } from "./ClientForm";
import { mapClientDocument, updateDocument } from "../services";

export const UpdateClient = ({
  params,
  model,
  setFunction,
  setUpdate,
  update,
}: IUpdateModelProps<TClient>) => {
  const [updatedClient, setUpdatedClient] = useState<TClient>({
    name: model.name,
    phone: model.phone,
    email: model.email,
    address: model.address,
    notes: model.notes,
    imageUrl: model.imageUrl,
  });

  const formSubmit = (e: React.FormEvent, image: File | undefined) => {
    e.preventDefault();
    updateDocument<TClient>(
      "clients",
      params,
      updatedClient,
      mapClientDocument,
      setFunction,
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
        model={updatedClient}
        submit="Update"
      />
    </div>
  );
};
