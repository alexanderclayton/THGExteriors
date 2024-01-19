import { BidStatus } from "../types";
import { validateEmail, validatePhone } from ".";

//  Adjusts selected date from input field to register correctly  //
const handleDate = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const selectedDate = new Date(e.target.value);
  const adjustedDate = new Date(
    selectedDate.getTime() + selectedDate.getTimezoneOffset() * 60000,
  );
  return adjustedDate;
};

//  Allows creation of nested fields in TProject.bid  //
const handleBid = <T>(setState: React.Dispatch<React.SetStateAction<T>>, field: string, value: boolean | BidStatus | number) => {
  setState((prevProject: any) => ({
    ...prevProject,
    bid: {
      ...prevProject.bid,
      [field]: value,
    },
  }));
};

//  Sets image state variable on file upload  //
export const handleImage = (e: any, setImage: React.Dispatch<React.SetStateAction<File | undefined>>) => {
  const files = e.target.files;
  if (files && files.length > 0) {
    setImage(files[0]);
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
    setValidation((prevValidation: any) => ({
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
    handleBid(setState, bidField, newValue as boolean | BidStatus | number);
  } else {
    setState((prevProject) => ({
      ...prevProject,
      [name]: newValue,
    }));
  }
};



