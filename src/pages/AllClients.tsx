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
  const [toggleAdd, setToggleAdd] = useState(false);

  useEffect(() => {
    getDocuments<TClient>("clients", mapClientDocument, setAllClients);
  }, []);

  useEffect(() => {
    if (allClients.length > 0) {
      setFilteredClients(allClients);
    }
  }, [allClients]);

  return (
    <div className="mx-auto flex flex-col items-center px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">All Clients</h1>
      <div className="mb-6 w-[50%]">
        <SearchFilter
          model={allClients}
          placeholder="Search Client Name"
          setFilteredModel={setFilteredClients}
          filterProperty="clientLastName"
          additionalFilterProperty="clientFirstName"
        />
      </div>
      <div className="w-[80%]">
        <Table
          header={clientTable}
          model={filteredClients}
          setModel={setFilteredClients}
          navigateUrl="client"
        />
      </div>
      {!toggleAdd && (
        <button onClick={() => setToggleAdd(!toggleAdd)}>Add Client</button>
      )}
      {toggleAdd && (
        <div className="mt-8">
          <ClientForm
            legend="Add New Client"
            model={client}
            setState={setClient}
            setAllState={setAllClients}
            submit="Add Client"
            toggle={toggleAdd}
            setToggle={setToggleAdd}
          />
        </div>
      )}
    </div>
  );
};
