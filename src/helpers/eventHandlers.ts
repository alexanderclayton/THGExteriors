import { BidStatus, TModels, TProject } from "../types";
import { validateEmail, validatePhone } from ".";
import { addDocument, getDocuments, queryDocuments, updateDocument } from "../services";
import { Params } from "react-router-dom";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

//  Adjusts selected date from input field to register correctly  //
const handleDate = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const selectedDate = new Date(e.target.value);
  const adjustedDate = new Date(
    selectedDate.getTime() + selectedDate.getTimezoneOffset() * 60000,
  );
  return adjustedDate;
};

//  Allows creation of nested fields in TProject.bid  //
const handleBid = (setState: React.Dispatch<React.SetStateAction<TProject>>, field: string, value: boolean | BidStatus | number) => {
  setState((prevProject) => ({
    ...prevProject,
    projectBid: {
      ...prevProject.projectBid,
      [field]: value,
    },
  }));
};

//  Sets image state variable on file upload  //
export const handleImage = (
  e: React.ChangeEvent<HTMLInputElement>, 
  setImage: React.Dispatch<React.SetStateAction<File | undefined>>,
  setImageThumbnail: React.Dispatch<React.SetStateAction<string>>
  ) => {
  const files = e.target.files;
  if (files && files.length > 0) {
    const temporaryImageUrl = URL.createObjectURL(files[0])
    setImage(files[0]);
    setImageThumbnail(temporaryImageUrl)
    return files[0];
  }
  return undefined;
};

//  Handles change on form input elements, sets state of TClient | TProject | TExpense objects accordingly  //
export const handleChange = <T, U>(
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  setState: React.Dispatch<React.SetStateAction<T>>,
  setValidation?: React.Dispatch<React.SetStateAction<U>>,
  bid?: string,
  bidField?: string,
) => {
  const { name, type, value } = e.target;

  let isValid = true;
  if (setValidation) {
    if (name === "email") {
      isValid = validateEmail(value);
    } else if (name === "phone") {
      isValid = validatePhone(value);
    }
    setValidation((prevValidation) => ({
      ...prevValidation,
      [name]: isValid,
    }));
  }

  const newValue =
    type === "date"
      ? new Date(handleDate(e))
      : type === "checkbox"
      ? (e.target as HTMLInputElement).checked
      : type === "number"
      ? parseInt(e.target.value)
      : type === "tel"
      ? parseInt(e.target.value)
      : e.target.value;

  if (bid && bidField && name === bid) {
    handleBid(setState as React.Dispatch<React.SetStateAction<TProject>>, bidField, newValue as boolean | BidStatus | number);
  } else {
    setState((prevProject) => ({
      ...prevProject,
      [name]: newValue,
    }));
  }
};

export const handleSearchFilterChange = <T>(
  e: React.ChangeEvent<HTMLInputElement>,
  model: T[],
  filterProperty: keyof T,
  setFunction: React.Dispatch<React.SetStateAction<T[]>>,
  additionalFilterProperty?: keyof T
  ) => {
  const value = e.target.value;
  const filtered = model.filter((filteredModel) => {
    const firstFilter = (filteredModel[filterProperty] as string).toLowerCase()
    const secondFilter = additionalFilterProperty ? (filteredModel[additionalFilterProperty] as string).toLowerCase() : ""
    return firstFilter.includes(value) || secondFilter.includes(value)
  });
  setFunction(filtered);
};


/// Form Submits ///
export const formSubmit = <T extends TModels>(
  e: React.FormEvent, 
  collection: string, 
  model: T, 
  setFunction: React.Dispatch<React.SetStateAction<T>>,
  mapFunction: (doc: QueryDocumentSnapshot<DocumentData>) => T,
  resetFunction?: (setState: React.Dispatch<React.SetStateAction<T>>, ref: React.RefObject<HTMLInputElement>, params?: Readonly<Params<string>>) => void,
  setAllFunction?: React.Dispatch<React.SetStateAction<T[]>>,
  image?: File | undefined,
  ref?: React.RefObject<HTMLInputElement>,
  params?: Readonly<Params<string>>,
  update?: boolean,
  setUpdate?: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
  e.preventDefault()
    if (update && params) {
      updateDocument<T>(collection, params, model, mapFunction, setFunction, setUpdate, update, image)
    } else if (setAllFunction !== undefined && resetFunction && ref) {
      const addDocumentCallBack = () => {
        resetFunction(setFunction, ref, params)
        if (params !== undefined) {
          queryDocuments<T>(collection, "clientId", "==", params.id as string, mapFunction, setAllFunction)
        } else {
          getDocuments<T>(collection, mapFunction, setAllFunction)
        }
      }
      addDocument<T>(collection, model, addDocumentCallBack, undefined, image)
    } else {
      console.log("Unsuccessful form submit")
    }
}