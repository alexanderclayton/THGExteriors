import { FirebaseError } from "firebase/app";
import { db, storage } from "../firebase/firebaseConfig";
import { collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteField, deleteDoc, query, where, QueryDocumentSnapshot, DocumentData, FieldValue, WithFieldValue, arrayUnion, arrayRemove } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { TClient, TProject } from "../types";
import { NavigateFunction, Params } from "react-router-dom";


//  Add document to Firebase  //
//  Usage: src/pages/AllClients.tsx  //
//  Usage: src/pages/Client.tsx  //
export const addDocument = async<T extends WithFieldValue<DocumentData>>( 
    collectionName: string,
    document: T,
    reset: () => void,
    callback?: () => Promise<void>,
    image?: File | undefined
    ) => {
    try {
      if (image !== undefined) {
        await addDoc(collection(db, `${collectionName}`), {
          ...document,
          imageUrl: await addImageToStorage(image as File)
        })
      } else {
        await addDoc(collection(db, `${collectionName}`), document);
      }
      console.log(`Document added to ${collectionName} collection!`);
      reset();
      if (callback) {
        callback()
      }
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
    mapFunction: (doc: QueryDocumentSnapshot<DocumentData>) => T,
    setData: (data: T) => void,
    ) => {
    try {
      const docSnap = await getDoc(doc(db, `${collectionName}`, `${params.id}`));
      if (docSnap.exists()) {
        const mappedData = mapFunction(docSnap)
        setData(mappedData);
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
  //  Usage: src/pages/AllProjects.tsx  //
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

  //  Get specific documents from firebase matching query criteria  //
  //  Usage: src/pages/Client.tsx  //
  export const queryDocuments = async<T>(
    collectionName: string,
    fieldName: string,
    params: Readonly<Params<string>>,
    mapFunction: (doc: QueryDocumentSnapshot<DocumentData>) => T,
    setData: (data: T[]) => void
  ) => {
    try {
      const q = query(
        collection(db, `${collectionName}`),
        where(`${fieldName}`, "==", params.id)
      )
      const querySnapshot = await getDocs(q)
      let docs = querySnapshot.docs.map(mapFunction)
      setData(docs)
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error(error.message)
      }
      console.error(error)
    }
  }

  //  Update document in the "clients" collection  //
  //  Usage: src/components/UpdateClient.tsx  //
  //  Usage: src/components/UpdateProject.tsx  //
  export const updateDocument = async<T>(
    collectionName: string,
    params: Readonly<Params<string>>,
    updatedDocument: TClient | TProject,
    mapFunction: (doc: QueryDocumentSnapshot<DocumentData>) => T,
    setData: React.Dispatch<React.SetStateAction<T>>,
    setUpdate?: React.Dispatch<React.SetStateAction<boolean>>,
    update?: boolean,
    image?: File | null,
    note?: string,
    setNote?: React.Dispatch<React.SetStateAction<string>>,
    index?: number
  ) => {
    try {
      const docRef = doc(db, `${collectionName}`, `${params.id}`);
      if (image !== null) {
        await updateDoc(docRef, {
          ...updatedDocument,
          imageUrl: await addImageToStorage(image as File)
        })
      } else if (setNote !== undefined) {
        if (index !== undefined) {
          await updateDoc(docRef, {
            notes: arrayRemove(updatedDocument.notes && updatedDocument.notes[index])
          })
          setNote("")
          console.log("note deleted")
        } else {
          await updateDoc(docRef, {
            notes: arrayUnion(note)
          })
          setNote("")
          console.log("note not deleted")
        }
      } else {
        await updateDoc(docRef, updatedDocument);
      }
      console.log(`updated ${collectionName}`);
      getDocument(collectionName, params, mapFunction, setData)
      if (setUpdate) {
        setUpdate(!update)
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error(error.message);
      }
      console.log(error);
    } 
  };

  //  Delete document and subcollections from "clients" collection  //
  //  Usage: src/pages/Client.tsx  //
  //  Usage: src/pages/Project.tsx  //
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

  export const addImageToStorage = async (image: File | null) => {
    if (image == null) return;
    try {
      const imageRef = ref(storage, `images/${image.name}`)
      await uploadBytes(imageRef, image);
      const downloadUrl = await getDownloadURL(imageRef)
      return downloadUrl
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error(error.message)
      }
      console.error(error)
    }
  }