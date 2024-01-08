import { FirebaseError } from "firebase/app";
import { db, storage } from "../firebase/firebaseConfig";
import { collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteField, deleteDoc, query, where, QueryDocumentSnapshot, DocumentData, FieldValue } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { TClient, TProject } from "../types";
import { NavigateFunction, Params } from "react-router-dom";


//  Add document to Firebase  //
//  Usage: src/pages/AllClients.tsx  //
//  Usage: src/pages/Client.tsx  //
export const addDocument = async ( 
    collectionName: string,
    data: TClient | TProject,
    reset: () => void,
    callback: () => Promise<void>
    ) => {
    try {
      await addDoc(collection(db, `${collectionName}`), data);
      console.log("document added", data.id);
      reset();
      callback()
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error(error.message);
      }
      console.error("error adding document", error);
    } 
  };

  //  Get individual document from Firebase  //
  //  Usage: src/pages/Client.tsx //
  //  Usage: src/pages/Project.tsx  //
  export const getDocument = async<T>(
    collectionName: string,
    params: Readonly<Params<string>>,
    setData: (data: T) => void,
    ) => {
    try {
      const docSnap = await getDoc(doc(db, `${collectionName}`, `${params.id}`));
      if (docSnap.exists()) {
        setData(docSnap.data() as T);
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
  export const getDocuments = async<T>(
    collectionName: string,
    mapFunction: (doc: QueryDocumentSnapshot<DocumentData>) => T,
    setData: (data: T[]) => void,
  ) => {
    try {
      const querySnapshot = await getDocs(collection(db, `${collectionName}`));
      let docs = querySnapshot.docs.map(mapFunction);
      setData(docs);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error(error.message);
      }
      console.error(error);
    }
  };

  //  Update document in the "clients" collection  //
  //  Usage: src/components/UpdateClient.tsx  //
  export const updateDocument = async<T>(
    collectionName: string,
    params: Readonly<Params<string>>,
    updatedDocument: TClient | TProject,
    setClient: React.Dispatch<React.SetStateAction<T>>,
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>,
    update: boolean
  ) => {
    try {
      const clientRef = doc(db, `${collectionName}`, `${params.id}`);
      await updateDoc(clientRef, updatedDocument);
      console.log(`updated ${collectionName}`);
      getDocument(collectionName, params, setClient)
      setUpdate(!update)
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error(error.message);
      }
      console.log(error);
    } 
  };

  //  Delete document and subcollections from "clients" collection  //
  //  Usage: src/pages/Client.tsx  //
  export const deleteDocument = async (
    collectionName: string,
    params: Readonly<Params<string>>,
    deleteFieldsFunction: (deleteField: FieldValue) => Record<string, FieldValue>,
    navigate: NavigateFunction,
    navigateUrl: string
  ) => {
    try {
      const clientRef = doc(db, `${collectionName}`, `${params.id}`);
      await updateDoc(clientRef, deleteFieldsFunction(deleteField()));
      await deleteDoc(doc(db, `${collectionName}`, `${params.id}`));
      console.log(`${collectionName} doc deleted`);
      navigate(`${navigateUrl}`)
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error(error.message);
      }
      console.error(error);
    }
  };

  //  Add document to the "projects" collection in Firebase with clientId property  //
  //  Usage: src/pages/Client.tsx //
  // export const addProject = async (
  //   project: TProject,
  //   setProject: React.Dispatch<React.SetStateAction<TProject>>,
  //   params: Readonly<Params<string>>,
  //   getClientProjects: () => Promise<void>
  // ) => {
  //   try {
  //     await addDoc(collection(db, "projects"), {
  //       clientId: project.clientId,
  //       projectName: project.projectName,
  //       projectDate: project.projectDate,
  //       paid: project.paid,
  //       imageUrl: project.imageUrl,
  //     });
  //     console.log("project added", project.projectName);
  //     setProject({
  //       clientId: params.id as string,
  //       projectName: "",
  //       projectDate: "",
  //       paid: false,
  //       imageUrl: "",
  //     });
  //   } catch (error: unknown) {
  //     if (error instanceof FirebaseError) {
  //       console.error(error.message);
  //     }
  //     console.error(error);
  //   } finally {
  //     getClientProjects();
  //   }
  // };

  //  Get individual document from the "projects" collection in Firebase  //
  //  Usage: src/pages/Project.tsx  //
  // export const getProject = async (
  //   params: Readonly<Params<string>>,
  //   setProject: React.Dispatch<React.SetStateAction<TProject>>
  // ) => {
  //   try {
  //     const docSnap = await getDoc(doc(db, "projects", `${params.id}`));
  //     if (docSnap.exists()) {
  //       setProject({ ...docSnap.data() } as TProject);
  //     }
  //   } catch (error: unknown) {
  //     if (error instanceof FirebaseError) {
  //       console.error(error.message);
  //     }
  //     console.error(error);
  //   }
  // };

  //  Get all documents from the "projects" collection in Firebase  //
  //  Usage: src/pages/AllProjects.tsx  //
  // export const getProjects = async<T>(
  //   collectionName: string,
  //   setData: (data: T) => void
  // ) => {
  //   try {
  //     const querySnapshot = await getDocs(collection(db, `${collectionName}`));
  //     let docs = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       clientId: doc.data().clientId,
  //       projectName: doc.data().projectName,
  //       projectDate: doc.data().projectDate,
  //       paid: doc.data().paid,
  //       imageUrl: doc.data().imageUrl,
  //     })) as TProject[];
  //     setData(docs as T);
  //   } catch (error: unknown) {
  //     if (error instanceof FirebaseError) {
  //       console.error(error.message);
  //     }
  //     console.error(error);
  //   }
  // };

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
  // export const updateProject = async (
  //   params: Readonly<Params<string>>,
  //   updatedProject: TProject,
  //   // setProject: React.Dispatch<React.SetStateAction<TProject>>,
  //   setUpdate: React.Dispatch<React.SetStateAction<boolean>>,
  //   update: boolean,
  // ) => {
  //   try {
  //     const projectRef = doc(db, "projects", `${params.id}`);
  //     await updateDoc(projectRef, updatedProject);
  //     console.log("updated project");
  //   } catch (error: unknown) {
  //     if (error instanceof FirebaseError) {
  //       console.error(error.message);
  //     }
  //     console.log(error);
  //   } finally {
  //     // getProject(params, setProject);
  //     setUpdate(!update);
  //   }
  // };

  //  Delete document and subcollections from "projects" collection  //
  //  Usage:  src/pages/Project.tsx  //
  // export const deleteProject = async (
  //   params: Readonly<Params<string>>,
  //   navigate: NavigateFunction
  // ) => {
  //   try {
  //     const projectRef = doc(db, "projects", `${params.id}`);
  //     await updateDoc(projectRef, {
  //       clientId: deleteField(),
  //       projectName: deleteField(),
  //       projectDate: deleteField(),
  //       paid: deleteField(),
  //       imageUrl: deleteField(),
  //     });
  //     await deleteDoc(doc(db, "projects", `${params.id}`));
  //     console.log("project deleted");
  //     navigate("/allprojects");
  //   } catch (error: unknown) {
  //     if (error instanceof FirebaseError) {
  //       console.error(error.message);
  //     }
  //     console.error(error);
  //   }
  // };

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