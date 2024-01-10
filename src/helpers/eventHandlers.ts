import { BidStatus, TClient, TProject } from "../types";

//  Adjusts selected date from input field to register correctly  //
const handleDate = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const selectedDate = new Date(e.target.value);
  const adjustedDate = new Date(
    selectedDate.getTime() + selectedDate.getTimezoneOffset() * 60000,
  );
  return adjustedDate;
};

//  Allows creation of nested fields in TProject.bid  //
const handleBid = (setState: any, field: string, value: boolean | BidStatus | number) => {
  setState((prevProject: any) => ({
    ...prevProject,
    bid: {
      ...prevProject.bid,
      [field]: value,
    },
  }));
};

//  Handles change on form input elements, sets state of TClient | TProject objects accordingly  //
export const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  setState: any,
  bid?: string,
  bidField?: string,
) => {
  const { name, type } = e.target;

  const newValue =
    type === "date"
      ? new Date(handleDate(e))
      : type === "checkbox"
      ? (e.target as HTMLInputElement).checked
      : type === "number"
      ? parseInt(e.target.value)
      : e.target.value;

  if (bid && bidField && name === bid) {
    handleBid(setState, bidField, newValue as boolean | BidStatus | number);
  } else {
    setState((prevProject: TClient | TProject) => ({
      ...prevProject,
      [name]: newValue,
    }));
  }
};



