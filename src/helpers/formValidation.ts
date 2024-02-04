import { Params } from "react-router-dom";
import { formSubmit } from ".";
import { TModels, TModelsValidation } from "../types";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

//  Validates form entry for proper email address  //
export const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

//  Validates form entry for 10 digit phone number  //
export const validatePhone = (phone: string) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone.toString());
};

//  Validates TModels form before performing formSubmit  //
export const validateSubmit = <T extends TModels, U extends TModelsValidation>(
    e: React.FormEvent<HTMLFormElement>,
    collection: string,
    modelValidation: U,
    model: T,
    setState: React.Dispatch<React.SetStateAction<T>>,
    setAllState: React.Dispatch<React.SetStateAction<T[]>> | undefined,
    resetState: (setState: React.Dispatch<React.SetStateAction<T>>, ref: React.RefObject<HTMLInputElement>, params?: Readonly<Params<string>>) => void,
    mapFunction: (doc: QueryDocumentSnapshot<DocumentData>) => T,
    params: Readonly<Params<string>> | undefined,
    image: File | undefined,
    imageRef: React.RefObject<HTMLInputElement>,
    formType: string | undefined,
    toggle: boolean | undefined,
    setToggle: React.Dispatch<React.SetStateAction<boolean>> | undefined,
    setUpdatedState: React.Dispatch<React.SetStateAction<T>> | undefined,
    resetAutocomplete?: boolean,
    setResetAutocomplete?: React.Dispatch<React.SetStateAction<boolean>>,
    ) => {
    e.preventDefault();
    const isFormValid = Object.values(modelValidation).every(
      (isValid) => isValid,
    );
    if (isFormValid) {
      if (formType === "update" && setUpdatedState) {
        formSubmit(
          e,
          collection,
          model,
          setUpdatedState,
          mapFunction,
          toggle,
          setToggle,
          undefined,
          undefined,
          image,
          imageRef,
          params,
          formType
        );
      } else {
        formSubmit(
          e,
          collection,
          model,
          setState,
          mapFunction,
          toggle,
          setToggle,
          resetState,
          setAllState,
          image,
          imageRef,
          params,
          formType
        );
        if (resetAutocomplete && setResetAutocomplete) {
            setResetAutocomplete(!resetAutocomplete);
        }
      }
    } else {
      console.error("form invalid");
    }
  };