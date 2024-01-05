//import//
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TClient } from "../types";
import { getClients, addClient } from "../services";

export const AllClients = () => {
  const [client, setClient] = useState<TClient>({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [allClients, setAllClients] = useState<TClient[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    getClients(setAllClients);
  }, []);

  const handleClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setClient((prevClient) => ({
      ...prevClient,
      [id]: value,
    }));
  };

  return (
    <div>
      <div className="flex flex-col">
        <p className="font-bold">add client</p>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          onChange={handleClientChange}
          value={client.name}
        />
        <label htmlFor="phone">Phone Number</label>
        <input
          type="text"
          id="phone"
          onChange={handleClientChange}
          value={client.phone}
        />
        <label htmlFor="email">Email Address</label>
        <input
          type="text"
          id="email"
          onChange={handleClientChange}
          value={client.email}
        />
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          onChange={handleClientChange}
          value={client.address}
        />
        <button
          onClick={() =>
            addClient(client, setClient, () => getClients(setAllClients))
          }
        >
          add client
        </button>
        <button onClick={() => getClients(setAllClients)}>get clients</button>
      </div>
      <div>
        {allClients.map((client) => (
          <div
            key={client.name}
            className="border border-black hover:cursor-pointer"
            onClick={() => navigate(`/client/${client.name}`)}
          >
            <p>
              <span className="font-bold">Name: </span>
              {client.name}
            </p>
            <p>
              <span className="font-bold">email: </span>
              {client.email}
            </p>
            <p>
              <span className="font-bold">phone: </span>
              {client.phone}
            </p>
            <p>
              <span className="font-bold">address: </span>
              {client.address}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
