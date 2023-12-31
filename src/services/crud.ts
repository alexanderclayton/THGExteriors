import { FirebaseError } from "firebase/app";
import { db, storage } from "../firebase/firebaseConfig";
import { collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteField, deleteDoc, query, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { TClient, TProject } from "../types";
import { NavigateFunction, Params } from "react-router-dom";


//  Add document to the "clients" collection in Firebase  //
//  Usage: src/pages/AllClients.tsx  //
export const addClient = async ( 
    client: TClient, 
    setClient: React.Dispatch<React.SetStateAction<TClient>>,
    getClients: () => Promise<void>
    ) => {
    try {
      await addDoc(collection(db, "clients"), {
        name: client.name,
        phone: client.phone,
        email: client.email,
        address: client.address,
        imageUrl: client.imageUrl,
      });
      console.log("client added", client.name);
      setClient({ name: "", phone: 0, email: "", address: "" });
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
      let docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        phone: doc.data().phone,
        email: doc.data().email,
        address: doc.data().address,
        imageUrl: doc.data().imageUrl,
      })) as TClient[];
      setAllClients(docs);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error(error.message);
      }
      console.error(error);
    }
  };

  //  Update document in the "clients" collection  //
  //  Usage: src/components/UpdateClient.tsx  //
  export const updateClient = async (
    params: Readonly<Params<string>>,
    updatedClient: TClient,
    setClient: React.Dispatch<React.SetStateAction<TClient>>,
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>,
    update: boolean
  ) => {
    try {
      const clientRef = doc(db, "clients", `${params.id}`);
      await updateDoc(clientRef, updatedClient);
      console.log("updated client");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error(error.message);
      }
      console.log(error);
    } finally {
      getClient(params, setClient)
      setUpdate(!update)
    }
  };

  //  Delete document and subcollections from "clients" collection  //
  //  Usage: src/pages/Client.tsx  //
  export const deleteClient = async (
    params: Readonly<Params<string>>,
    navigate: NavigateFunction
  ) => {
    try {
      const clientRef = doc(db, "clients", `${params.id}`);
      await updateDoc(clientRef, {
        name: deleteField(),
        phone: deleteField(),
        email: deleteField(),
        address: deleteField(),
        imageUrl: deleteField(),
      });
      await deleteDoc(doc(db, "clients", `${params.id}`));
      console.log("client deleted");
      navigate("/allclients");
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
        imageUrl: project.imageUrl,
      });
      console.log("project added", project.projectName);
      setProject({
        clientId: params.id as string,
        projectName: "",
        projectDate: "",
        paid: false,
        imageUrl: "",
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
        imageUrl: doc.data().imageUrl,
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
        imageUrl: doc.data().imageUrl,
      })) as TProject[];
      setClientProjects(docs);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error(error.message);
      }
      console.error(error);
    }
  };

  //  Update document in the "projects" collection //
  //  Usage: src/component/UpdateProject.tsx  //
  export const updateProject = async (
    params: Readonly<Params<string>>,
    updatedProject: TProject,
    setProject: React.Dispatch<React.SetStateAction<TProject>>,
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>,
    update: boolean,
  ) => {
    try {
      const projectRef = doc(db, "projects", `${params.id}`);
      await updateDoc(projectRef, updatedProject);
      console.log("updated project");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error(error.message);
      }
      console.log(error);
    } finally {
      getProject(params, setProject);
      setUpdate(!update);
    }
  };

  //  Delete document and subcollections from "projects" collection  //
  //  Usage:  src/pages/Project.tsx  //
  export const deleteProject = async (
    params: Readonly<Params<string>>,
    navigate: NavigateFunction
  ) => {
    try {
      const projectRef = doc(db, "projects", `${params.id}`);
      await updateDoc(projectRef, {
        clientId: deleteField(),
        projectName: deleteField(),
        projectDate: deleteField(),
        paid: deleteField(),
        imageUrl: deleteField(),
      });
      await deleteDoc(doc(db, "projects", `${params.id}`));
      console.log("project deleted");
      navigate("/allprojects");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error(error.message);
      }
      console.error(error);
    }
  };

  //  Update doc in collection to include imageUrl field  //
  //  Usage src/pages/Project.tsx  //
  export const uploadImage = async (
    image: File | null,
    setterFunction: (url: string) => void,
    collection: string,
    params: Readonly<Params<string>>,
  ) => {
    if (image == null) return;
    try {
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);
      const downloadUrl = await getDownloadURL(imageRef);
      setterFunction(downloadUrl);
      await updateDoc(doc(db, collection, `${params.id}`), {
        imageUrl: downloadUrl,
      });
      console.log("image uploaded");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error(error.message);
      }
      console.log(error);
    }
  };