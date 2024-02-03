//import//
import { useState, useEffect } from "react";
import { TClient } from "../types";
import { getDocuments } from "../services";
import { ClientForm } from "../components/ClientForm";
import { mapClientDocument } from "../services";
import { RadarAddress } from "radar-sdk-js/dist/types";
import { SearchFilter } from "../components/SearchFilter";
import { clientTable } from "../helpers";
import { Table } from "../components/Table";

export const AllClients = () => {
  const [client, setClient] = useState<TClient>({
    clientFirstName: "",
    clientLastName: "",
    clientPhone: 0,
    clientEmail: "",
    clientAddress: {} as RadarAddress,
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
        filterProperty="clientLastName"
        additionalFilterProperty="clientFirstName"
      />
      <Table
        header={clientTable}
        model={filteredClients}
        setModel={setFilteredClients}
        navigateUrl="client"
      />
    </div>
  );
};
