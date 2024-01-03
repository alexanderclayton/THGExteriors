//import//
import { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { db } from "../firebase/firebaseConfig";

type TClient = {
  name: string;
  phone: string;
  email: string;
};

export const AllClients = () => {
  const [client, setClient] = useState<TClient>({
    name: "",
    phone: "",
    email: "",
  });
  const [allClients, setAllClients] = useState<TClient[]>([]);

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
    console.log("button clicked")
    try {
      const docRef = await addDoc(collection(db, "clients"), {
        name: client.name,
        phone: client.phone,
        email: client.email,
      });
      console.log("client added", docRef.id);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error(error.message);
      }
      console.error("error adding document", error);
    }
  };

  return (
    <div>
      <p>add client</p>
      <label htmlFor="client-name">Name</label>
      <input type="text" id="name" onChange={handleClientChange} />
      <label htmlFor="phone">Phone Number</label>
      <input type="text" id="phone" onChange={handleClientChange} />
      <label htmlFor="email">Email Address</label>
      <input type="text" id="email" onChange={handleClientChange} />
      <button onClick={addClient}>add client</button>
      <button onClick={getClients}>get clients</button>
      <div>
        {allClients.map((client) => (
          <div key={client.name} className="border border-black">
            <p>{client.name}</p>
            <p>{client.email}</p>
            <p>{client.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
