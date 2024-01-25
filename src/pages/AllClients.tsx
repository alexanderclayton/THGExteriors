//import//
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TClient } from "../types";
import { getDocuments } from "../services";
import { ClientForm } from "../components/ClientForm";
import { mapClientDocument } from "../services";
import { RadarAddress } from "radar-sdk-js/dist/types";
import { SearchFilter } from "../components/SearchFilter";

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
  const [filteredClients, setFilteredClients] = useState<TClient[]>([]);

  useEffect(() => {
    getDocuments<TClient>("clients", mapClientDocument, setAllClients);
  }, []);

  useEffect(() => {
    if (allClients.length > 0) {
      setFilteredClients(allClients);
    }
  }, [allClients]);

  return (
    <div>
      <ClientForm
        legend="Add New Client"
        model={client}
        setState={setClient}
        setAllState={setAllClients}
        submit="Add Client"
      />
      <button onClick={() => console.log(allClients)}>All Clients</button>
      <SearchFilter
        model={allClients}
        setFilteredModel={setFilteredClients}
        filterProperty="name"
      />
      <div>
        {filteredClients.map((client) => (
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
