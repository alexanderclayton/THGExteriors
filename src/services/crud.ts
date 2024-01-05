import { FirebaseError } from "firebase/app";
import { db } from "../firebase/firebaseConfig";
import { collection, doc, addDoc, setDoc, getDoc, getDocs, query, where } from "firebase/firestore";
import { TClient, TProject } from "../types";
import { Params } from "react-router-dom";


//  Add document to the "clients" collection in Firebase  //
//  Usage: src/pages/AllClients.tsx  //
export const addClient = async ( 
    client: TClient, 
    setClient: React.Dispatch<React.SetStateAction<TClient>>,
    getClients: () => Promise<void>
    ) => {
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

  //  Get individual document from the "clients" collection in Firebase  //
  //  Usage: src/pages/Client.tsx //
  export const getClient = async (
    params: Readonly<Params<string>>,
    setClient: React.Dispatch<React.SetStateAction<TClient>>
    ) => {
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

  //  Get all documents from the "clients" collection in Firebase  //
  //  Usage: src/pages/AllClients.tsx //
  export const getClients = async (
    setAllClients: React.Dispatch<React.SetStateAction<TClient[]>>
  ) => {
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

  //  Add document to the "projects" collection in Firebase with clientId property  //
  //  Usage: src/pages/Client.tsx //
  export const addProject = async (
    project: TProject,
    setProject: React.Dispatch<React.SetStateAction<TProject>>,
    params: Readonly<Params<string>>,
    getClientProjects: () => Promise<void>
  ) => {
    try {
      await addDoc(collection(db, "projects"), {
        clientId: project.clientId,
        projectName: project.projectName,
        projectDate: project.projectDate,
        paid: project.paid,
      });
      console.log("project added", project.projectName);
      setProject({
        clientId: params.id as string,
        projectName: "",
        projectDate: "",
        paid: false,
      });
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error(error.message);
      }
      console.error(error);
    } finally {
      getClientProjects();
    }
  };

  //  Get individual document from the "projects" collection in Firebase  //
  //  Usage: src/pages/Project.tsx  //
  export const getProject = async (
    params: Readonly<Params<string>>,
    setProject: React.Dispatch<React.SetStateAction<TProject>>
  ) => {
    try {
      const docSnap = await getDoc(doc(db, "projects", `${params.id}`));
      if (docSnap.exists()) {
        setProject({ ...docSnap.data() } as TProject);
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error(error.message);
      }
      console.error(error);
    }
  };

  //  Get all documents from the "projects" collection in Firebase  //
  //  Usage: src/pages/AllProjects.tsx  //
  export const getProjects = async (
    setAllProjects: React.Dispatch<React.SetStateAction<TProject[]>>
  ) => {
    try {
      const querySnapshot = await getDocs(collection(db, "projects"));
      let docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        clientId: doc.data().clientId,
        projectName: doc.data().projectName,
        projectDate: doc.data().projectDate,
        paid: doc.data().paid,
      })) as TProject[];
      setAllProjects(docs);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error(error.message);
      }
      console.error(error);
    }
  };

  //  Get all documents in the "projects" collection associated with a particular clientId  //
  //  Usage: src/pages/Client.tsx  //
  export const getClientProjects = async (
    params: Readonly<Params<string>>,
    setClientProjects: React.Dispatch<React.SetStateAction<TProject[]>>
  ) => {
    try {
      const q = query(
        collection(db, "projects"),
        where("clientId", "==", params.id),
      );
      const querySnapshot = await getDocs(q);
      let docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        clientId: doc.data().clientId,
        projectName: doc.data().projectName,
        projectDate: doc.data().projectDate,
        paid: doc.data().paid,
      })) as TProject[];
      setClientProjects(docs);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error(error.message);
      }
      console.error(error);
    }
  };