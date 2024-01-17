import { DocumentData, FieldValue, QueryDocumentSnapshot } from "firebase/firestore";
import { TClient, TExpense, TProject } from "../types";

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
    city: doc.data().city,
    state: doc.data().state,
    zip: doc.data().zip,
    notes: doc.data().notes,
    imageUrl: doc.data().imageUrl,
});

//  Maps a Firestore document snapshot to a TProject object  //
//  Passed into crud function as an argument  //
//  Usage: src/pages/AllProjects.tsx  //
//  Usage: src/pages/Client.tsx  //
export const mapProjectDocument = (
    doc: QueryDocumentSnapshot<DocumentData>,
  ): TProject => ({
    id: doc.id,
    clientId: doc.data().clientId,
    projectName: doc.data().projectName,
    projectDate: doc.data().projectDate.toDate(),
    paid: doc.data().paid,
    bid: doc.data().bid,
    projectType: doc.data().projectType,
    notes: doc.data().notes,
    imageUrl: doc.data().imageUrl,
});

//  Maps a Firestore document snapshot to a TExpense object  //
export const mapExpenseDocument = (
  doc: QueryDocumentSnapshot<DocumentData>
): TExpense => ({
  id: doc.id,
  expenseType: doc.data().expenseType,
  expenseAmount: doc.data().expenseAmount,
  paymentType: doc.data().paymentType,
  expenseDate: doc.data().expenseDate.toDate(),
  vendor: doc.data().vendor,
  description: doc.data().description,
  projectId: doc.data().projectId
})

//  Applies deleteField() to TClient object  //
//  Passed into deleteDocument() as an argument  //
//  Usage:  src/pages/Client.tsx  //
export const deleteClientFields = (deleteField: FieldValue) => ({
    name: deleteField,
    phone: deleteField,
    email: deleteField,
    address: deleteField,
    city: deleteField,
    state: deleteField,
    zip: deleteField,
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
    bid: deleteFields,
    projectType: deleteFields,
    imageUrl: deleteFields,
});

//  Applies deleteField() to TExpense object  //
export const deleteExpenseFields = (deleteFields: FieldValue) => ({
  expenseType: deleteFields,
  expenseAmount: deleteFields,
  paymentType: deleteFields,
  expenseDate: deleteFields,
  vendor: deleteFields,
  description: deleteFields
})