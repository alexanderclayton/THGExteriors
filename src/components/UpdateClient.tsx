import { useState } from "react";
import { TClient, IUpdateModelProps } from "../types";
import { ClientForm } from "./ClientForm";
import { HiOutlinePaintBrush } from "react-icons/hi2";

export const UpdateClient = ({
  params,
  model,
  setFunction,
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
  const [toggleUpdate, setToggleUpdate] = useState(false);

  return (
    <div>
      {!toggleUpdate && (
        <HiOutlinePaintBrush
          size={25}
          onClick={() => setToggleUpdate(!toggleUpdate)}
          className="cursor-pointer duration-300 hover:scale-125"
        />
      )}
      {toggleUpdate && (
        <ClientForm
          legend="Update Client Information"
          model={updatedClient}
          setState={setUpdatedClient}
          submit="Update"
          toggle={toggleUpdate}
          setToggle={setToggleUpdate}
          params={params}
          setUpdatedState={setFunction}
          formType="update"
        />
      )}
    </div>
  );
};
