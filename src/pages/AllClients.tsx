//import//
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TClient } from "../types";
import { getDocuments, addDocument } from "../services";
import { ClientForm } from "../components/ClientForm";
import { mapClientDocument } from "../services";
import { resetClients } from "../helpers";
import { RadarAddress } from "radar-sdk-js/dist/types";

export const AllClients = () => {
  const navigate = useNavigate();
  const [client, setClient] = useState<TClient>({
    name: "",
    phone: 0,
    email: "",
    address: {} as RadarAddress,
    notes: [],
    imageUrl: "",
  });
  const [allClients, setAllClients] = useState<TClient[]>([]);

  useEffect(() => {
    getDocuments<TClient>("clients", mapClientDocument, setAllClients);
  }, []);

  const formSubmit = (e: React.FormEvent, image: any) => {
    e.preventDefault();
    addDocument<TClient>(
      "clients",
      client,
      () => resetClients(setClient),
      () => getDocuments<TClient>("clients", mapClientDocument, setAllClients),
      image,
    );
  };

  return (
    <div>
      <ClientForm
        legend="Add New Client"
        setState={setClient}
        formSubmit={formSubmit}
        model={client}
        submit="Add Client"
      />
      <button onClick={() => console.log(allClients)}>All Clients</button>
      <div>
        {allClients.map((client) => (
          <div
            key={client.id}
            className="border border-black hover:cursor-pointer"
            onClick={() => navigate(`/client/${client.id}`)}
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
              {client.phone.toString()}
            </p>
            <p>
              <span className="font-bold">address: </span>
              {client.address.addressLabel}
            </p>
          </div>
        ))}
        <button onClick={() => console.log(typeof client.phone, client.phone)}>
          Test
        </button>
      </div>
    </div>
  );
};
