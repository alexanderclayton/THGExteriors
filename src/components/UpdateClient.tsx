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
    clientFirstName: model.clientFirstName,
    clientLastName: model.clientLastName,
    clientPhone: model.clientPhone,
    clientEmail: model.clientEmail,
    clientAddress: model.clientAddress,
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
