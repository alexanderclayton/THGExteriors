import { DocumentData, FieldValue, QueryDocumentSnapshot } from "firebase/firestore";
import { TClient, TProject } from "../types";

//  Maps a Firestore document snapshot to a TClient object  //
//  Passed into crud fuction as an argument  //
//  Usage: src/pages/AllClients.tsx  //
export const mapClientDocument = (
    doc: QueryDocumentSnapshot<DocumentData>,
  ): TClient => ({
    id: doc.id,
    name: doc.data().name,
    phone: doc.data().phone,
    email: doc.data().email,
    address: doc.data().address,
    imageUrl: doc.data().imageUrl,
});

//  Maps a Firestore document snapshot to a TProject object  //
//  Passed into crud function as an argument  //
//  Usage:  src/pages/AllProjects.tsx  //
export const mapProjectDocument = (
    doc: QueryDocumentSnapshot<DocumentData>,
  ): TProject => ({
    id: doc.id,
    clientId: doc.data().clientId,
    projectName: doc.data().projectName,
    projectDate: doc.data().projectDate,
    paid: doc.data().paid,
    imageUrl: doc.data().imageUrl,
});

//  Applies deleteField() to TClient object  //
//  Passed into deleteDocument() as an argument  //
//  Usage:  src/pages/Client.tsx  //
export const deleteClientFields = (deleteField: FieldValue) => ({
    name: deleteField,
    phone: deleteField,
    email: deleteField,
    address: deleteField,
    imageUrl: deleteField,
});

//  Applies deleteField() to TProject object  //
//  Passed into deleteDocument as argument  //
//  Usage:  src/pages/Project.tsx  //
export const deleteProjectFields = (deleteFields: FieldValue) => ({
    clientId: deleteFields,
    projectName: deleteFields,
    projectDate: deleteFields,
    paid: deleteFields,
    imageUrl: deleteFields,
});