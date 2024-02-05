import { DocumentData, FieldValue, QueryDocumentSnapshot } from "firebase/firestore";
import { TClient, TExpense, TProject } from "../types";

//  Maps a Firestore document snapshot to a TClient object  //
export const mapClientDocument = (
    doc: QueryDocumentSnapshot<DocumentData>,
  ): TClient => ({
    id: doc.id,
    clientFirstName: doc.data().clientFirstName,
    clientLastName: doc.data().clientLastName,
    clientPhone: doc.data().clientPhone,
    clientEmail: doc.data().clientEmail,
    clientAddress: doc.data().clientAddress,
    notes: doc.data().notes,
    imageUrl: doc.data().imageUrl,
});

//  Maps a Firestore document snapshot to a TProject object  //
export const mapProjectDocument = (
    doc: QueryDocumentSnapshot<DocumentData>,
  ): TProject => ({
    id: doc.id,
    projectClientId: doc.data().projectClientId,
    projectName: doc.data().projectName,
    projectStartDate: doc.data().projectStartDate.toDate(),
    projectEndDate: doc.data().projectEndDate.toDate(),
    projectPaid: doc.data().projectPaid,
    projectPaymentType: doc.data().projectPaymentType,
    projectBid: doc.data().projectBid,
    projectType: doc.data().projectType,
    projectStatus: doc.data().projectStatus,
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
  expensePaymentType: doc.data().expensePaymentType,
  expenseDate: doc.data().expenseDate.toDate(),
  expenseVendor: doc.data().expenseVendor,
  expenseDescription: doc.data().expenseDescription,
  expenseProjectId: doc.data().expenseProjectId,
  notes: doc.data().notes,
  imageUrl: doc.data().imageUrl
})

//  Applies deleteField() to TClient object, used to delete subfields prior to deleting document  //
export const deleteClientFields = (deleteField: FieldValue) => ({
    clientFirstName: deleteField,
    clientLastName: deleteField,
    clientPhone: deleteField,
    clientEmail: deleteField,
    clientAddress: deleteField,
    notes: deleteField,
    imageUrl: deleteField,
});

//  Applies deleteField() to TProject object, used to delete subfields prior to deleting document  //
export const deleteProjectFields = (deleteFields: FieldValue) => ({
    projectClientId: deleteFields,
    projectName: deleteFields,
    projectStartDate: deleteFields,
    projectEndDate: deleteFields,
    projectPaid: deleteFields,
    projectPaymentType: deleteFields,
    projectBid: deleteFields,
    projectType: deleteFields,
    projectStatus: deleteFields,
    notes: deleteFields,
    imageUrl: deleteFields,
});

//  Applies deleteField() to TExpense object, used to delete subfields prior to deleting document  //
export const deleteExpenseFields = (deleteFields: FieldValue) => ({
  expenseType: deleteFields,
  expenseAmount: deleteFields,
  expensePaymentType: deleteFields,
  expenseDate: deleteFields,
  expenseVendor: deleteFields,
  expenseDescription: deleteFields,
  expenseProjectId: deleteFields,
  notes: deleteFields,
  imageUrl: deleteFields

})