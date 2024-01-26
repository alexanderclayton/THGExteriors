import { useState } from "react";
import { TClient, IUpdateModelProps } from "../types";
import { ClientForm } from "./ClientForm";

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

  return (
    <div>
      <ClientForm
        legend="Update Client Information"
        model={updatedClient}
        setState={setUpdatedClient}
        submit="Update"
        params={params}
        update={update}
        setUpdate={setUpdate}
        setUpdatedState={setFunction}
        formType="update"
      />
    </div>
  );
};
