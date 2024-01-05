//import//
import { FirebaseError } from "firebase/app";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";

type TClient = {
  name: string;
  phone: string;
  email: string;
  address: string;
};

export const Client = () => {
  const [client, setClient] = useState<TClient>({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const params = useParams();

  const getClient = async () => {
    try {
      const docSnap = await getDoc(doc(db, "clients", `${params.id}`));
      if (docSnap.exists()) {
        setClient({ ...docSnap.data() } as TClient);
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error(error.message);
      }
      console.error(error);
    }
  };

  useEffect(() => {
    getClient();
  }, []);

  return (
    <div>
      <p>{client.name}</p>
      <p>{client.phone}</p>
      <p>{client.email}</p>
      <p>{client.address}</p>
    </div>
  );
};
