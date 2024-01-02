//import//
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
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
    </div>
  );
};
