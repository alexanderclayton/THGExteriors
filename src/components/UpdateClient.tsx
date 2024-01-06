import { useState } from "react";
import { TClient } from "../types";
import { Params } from "react-router";
import { updateClient } from "../services";

interface IUpdateClientProps {
  params: Readonly<Params<string>>;
  client: TClient;
  setClient: React.Dispatch<React.SetStateAction<TClient>>;
  update: boolean
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UpdateClient: React.FC<IUpdateClientProps> = ({
  params,
  client,
  setClient,
  update,
  setUpdate,
}) => {
  const [updatedClient, setUpdatedClient] = useState<TClient>({
    name: client.name,
    phone: client.phone,
    email: client.email,
    address: client.address,
  });

  const handleUpdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUpdatedClient((prevClient) => ({
      ...prevClient,
      [id]: value,
    }));
  };

  return (
    <div>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        className="border border-black"
        onChange={handleUpdateChange}
        value={updatedClient.name}
      />
      <label htmlFor="phone">Name:</label>
      <input
        type="text"
        id="phone"
        className="border border-black"
        onChange={handleUpdateChange}
        value={updatedClient.phone}
      />
      <label htmlFor="email">Name:</label>
      <input
        type="text"
        id="email"
        className="border border-black"
        onChange={handleUpdateChange}
        value={updatedClient.email}
      />
      <label htmlFor="address">Name:</label>
      <input
        type="text"
        id="address"
        className="border border-black"
        onChange={handleUpdateChange}
        value={updatedClient.address}
      />
      <button onClick={() => console.log(updatedClient)}>Check Update</button>
      <button
        onClick={() =>
          updateClient(params, updatedClient, setClient, update, setUpdate)
        }
      >
        Update Client In Firebase
      </button>
    </div>
  );
};
