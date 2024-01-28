//import//
import { useRef, useState } from "react";
import {
  formSubmit,
  handleChange,
  handleImage,
  resetClients,
} from "../helpers";
import { IFormProps, TClient, TClientValidation } from "../types";
import { Autocomplete } from "./Autocomplete";
import "radar-sdk-js/dist/radar.css";
import { mapClientDocument } from "../services";

export const ClientForm = ({
  legend,
  model,
  setState,
  setAllState,
  submit,
  params,
  update,
  setUpdate,
  setUpdatedState,
  formType,
}: IFormProps<TClient>) => {
  const imageRef = useRef<HTMLInputElement>(null)
  const [resetAutocomplete, setResetAutocomplete] = useState(false);
  const [clientValidation, setClientValidation] = useState<TClientValidation>({
    clientFirstName: true,
    clientLastName: true,
    clientPhone: true,
    clientEmail: true,
    clientAddress: true,
  });
  const [image, setImage] = useState<File | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isFormValid = Object.values(clientValidation).every(
      (isValid) => isValid,
    );
    if (isFormValid) {
      if (formType === "update" && setUpdatedState) {
        formSubmit(
          e,
          "clients",
          model,
          setUpdatedState,
          mapClientDocument,
          undefined,
          undefined,
          image,
          imageRef,
          params,
          update,
          setUpdate,
        );
      } else {
        formSubmit(
          e,
          "clients",
          model,
          setState,
          mapClientDocument,
          resetClients,
          setAllState,
          image,
          imageRef
        );
        setResetAutocomplete(!resetAutocomplete);
      }
    } else {
      console.error("form invalid");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>{legend}</legend>
          <div>
            <label htmlFor="clientLastName">Last Name:</label>
            <input
              type="text"
              id="clientLastName"
              name="clientLastName"
              className="border border-black"
              onChange={(e) => handleChange(e, setState, setClientValidation)}
              value={model.clientLastName}
              required
            />
          </div>
          <div>
            <label htmlFor="clientFirstName">First Name:</label>
            <input
              type="text"
              id="clientFirstName"
              name="clientFirstName"
              className="border border-black"
              onChange={(e) => handleChange(e, setState, setClientValidation)}
              value={model.clientFirstName}
              required
            />
          </div>
          <div>
            <label htmlFor="clientPhone">Phone:</label>
            <input
              type="tel"
              id="clientPhone"
              name="clientPhone"
              className="border border-black"
              onChange={(e) => handleChange(e, setState, setClientValidation)}
              value={model.clientPhone.toString()}
            />
          </div>
          <div>
            <label htmlFor="clientEmail">Email:</label>
            <input
              type="email"
              id="clientEmail"
              name="clientEmail"
              className="border border-black"
              onChange={(e) => handleChange(e, setState, setClientValidation)}
              value={model.clientEmail}
            />
          </div>
          <Autocomplete
            setState={setState}
            resetAutocomplete={resetAutocomplete}
          />
          <div>
            <label htmlFor="image">Upload Image:</label>
            <input
              type="file"
              id="image"
              ref={imageRef}
              className="border border-black"
              onChange={(e) => handleImage(e, setImage)}
            />
          </div>
        </fieldset>
        <input type="submit" value={submit} />
      </form>
      <button onClick={() => console.log(clientValidation)}>Test</button>
      <button onClick={() => console.log(model)}>Client</button>
    </div>
  );
};
