import { useState } from "react";
import { TClient } from "../types";
import { Params } from "react-router";
import { updateClient } from "../services";

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
  });

  const handleUpdateClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        onChange={handleUpdateClientChange}
        value={updatedClient.name}
      />
      <label htmlFor="phone">Name:</label>
      <input
        type="text"
        id="phone"
        className="border border-black"
        onChange={handleUpdateClientChange}
        value={updatedClient.phone}
      />
      <label htmlFor="email">Name:</label>
      <input
        type="text"
        id="email"
        className="border border-black"
        onChange={handleUpdateClientChange}
        value={updatedClient.email}
      />
      <label htmlFor="address">Name:</label>
      <input
        type="text"
        id="address"
        className="border border-black"
        onChange={handleUpdateClientChange}
        value={updatedClient.address}
      />
      <button onClick={() => console.log(updatedClient)}>Check</button>
      <button
        onClick={() =>
          updateClient(params, updatedClient, setClient, setUpdate, update)
        }
      >
        Update Client In Firebase
      </button>
    </div>
  );
};
