//import//
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TClient } from "../types";
import { getDocuments, addDocument } from "../services";
import { ClientForm } from "../components/ClientForm";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export const AllClients = () => {
  const navigate = useNavigate();
  const [client, setClient] = useState<TClient>({
    name: "",
    phone: 0,
    email: "",
    address: "",
    imageUrl: "",
  });
  const [allClients, setAllClients] = useState<TClient[]>([]);

  const mapClientDocument = (
    doc: QueryDocumentSnapshot<DocumentData>,
  ): TClient => ({
    id: doc.id,
    name: doc.data().name,
    phone: doc.data().phone,
    email: doc.data().email,
    address: doc.data().address,
    imageUrl: doc.data().imageUrl,
  });

  const setAllClientsDocs = (data: TClient[]) => {
    setAllClients(data);
  };

  useEffect(() => {
    getDocuments("clients", mapClientDocument, setAllClientsDocs);
  }, []);

  const resetClients = () => {
    setClient({
      name: "",
      phone: 0,
      email: "",
      address: "",
      imageUrl: "",
    });
  };

  const formSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDocument(
      "clients",
      client,
      () => resetClients,
      () =>
        getDocuments(
          "clients",
          mapClientDocument,
          setAllClientsDocs
        ),
    );
  };

  return (
    <div>
      <ClientForm
        legend="Add New Client"
        setState={setClient}
        formSubmit={formSubmit}
        client={client}
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
              {client.phone}
            </p>
            <p>
              <span className="font-bold">address: </span>
              {client.address}
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
