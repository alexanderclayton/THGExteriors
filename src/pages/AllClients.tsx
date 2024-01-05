//import//
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { db } from "../firebase/firebaseConfig";

type TClient = {
  name: string;
  phone: string;
  email: string;
  address: string;
};

export const AllClients = () => {
  const [client, setClient] = useState<TClient>({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [allClients, setAllClients] = useState<TClient[]>([]);

  const navigate = useNavigate();

  const getClients = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "clients"));
      let docs = querySnapshot.docs.map((doc) => doc.data()) as TClient[];
      setAllClients(docs);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error(error.message);
      }
      console.error(error);
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  const handleClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setClient((prevClient) => ({
      ...prevClient,
      [id]: value,
    }));
  };

  const addClient = async () => {
    try {
      await setDoc(doc(db, "clients", `${client.name}`), {
        name: client.name,
        phone: client.phone,
        email: client.email,
        address: client.address,
      });
      console.log("client added", client.name);
      setClient({ name: "", phone: "", email: "", address: "" });
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error(error.message);
      }
      console.error("error adding document", error);
    } finally {
      getClients();
    }
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
        <button onClick={addClient}>add client</button>
        <button onClick={getClients}>get clients</button>
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
