//import//
import { useState } from "react";
import { handleChange, handleImage } from "../helpers";
import { IClientFormProps, TClientValidation } from "../types";
import { Autocomplete } from "./Autocomplete";
import "radar-sdk-js/dist/radar.css";

export const ClientForm: React.FC<IClientFormProps> = ({
  legend,
  setState,
  formSubmit,
  client,
  submit,
}) => {
  const [resetAutocomplete, setResetAutocomplete] = useState(false);
  const [clientValidation, setClientValidation] = useState<TClientValidation>({
    name: true,
    phone: true,
    email: true,
    address: true,
  });
  const [image, setImage] = useState<File | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isFormValid = Object.values(clientValidation).every(
      (isValid) => isValid,
    );
    if (isFormValid) {
      formSubmit(e, image);
      setResetAutocomplete(!resetAutocomplete);
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
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              className="border border-black"
              onChange={(e) => handleChange(e, setState, setClientValidation)}
              value={client.name}
              required
            />
          </div>
          <div>
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="border border-black"
              onChange={(e) => handleChange(e, setState, setClientValidation)}
              value={client.phone.toString()}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="border border-black"
              onChange={(e) => handleChange(e, setState, setClientValidation)}
              value={client.email}
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
              className="border border-black"
              onChange={(e) => handleImage(e, setImage)}
            />
          </div>
        </fieldset>
        <input type="submit" value={submit} />
      </form>
      <button onClick={() => console.log(clientValidation)}>Test</button>
      <button onClick={() => console.log(client)}>Client</button>
    </div>
  );
};
