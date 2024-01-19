import { DocumentData, FieldValue, QueryDocumentSnapshot } from "firebase/firestore";
import { TClient, TExpense, TProject } from "../types";

//  Maps a Firestore document snapshot to a TClient object  //
export const mapClientDocument = (
    doc: QueryDocumentSnapshot<DocumentData>,
  ): TClient => ({
    id: doc.id,
    name: doc.data().name,
    phone: doc.data().phone,
    email: doc.data().email,
    address: doc.data().address,
    notes: doc.data().notes,
    imageUrl: doc.data().imageUrl,
});

//  Maps a Firestore document snapshot to a TProject object  //
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

//  Applies deleteField() to TClient object, used to delete subfields prior to deleting document  //
export const deleteClientFields = (deleteField: FieldValue) => ({
    name: deleteField,
    phone: deleteField,
    email: deleteField,
    address: deleteField,
    imageUrl: deleteField,
});

//  Applies deleteField() to TProject object, used to delete subfields prior to deleting document  //
export const deleteProjectFields = (deleteFields: FieldValue) => ({
    clientId: deleteFields,
    projectName: deleteFields,
    projectDate: deleteFields,
    paid: deleteFields,
    bid: deleteFields,
    projectType: deleteFields,
    imageUrl: deleteFields,
});

//  Applies deleteField() to TExpense object, used to delete subfields prior to deleting document  //
export const deleteExpenseFields = (deleteFields: FieldValue) => ({
  expenseType: deleteFields,
  expenseAmount: deleteFields,
  paymentType: deleteFields,
  expenseDate: deleteFields,
  vendor: deleteFields,
  description: deleteFields
})