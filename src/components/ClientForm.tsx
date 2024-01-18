//import//
import { useEffect, useRef, useState } from "react";
import { handleChange } from "../helpers";
import { IClientFormProps, TClientValidation } from "../types";
import { getAutocomplete } from "../radar";
import "radar-sdk-js/dist/radar.css";

export const ClientForm: React.FC<IClientFormProps> = ({
  legend,
  setState,
  formSubmit,
  client,
  submit,
}) => {
  const autocompleteRef = useRef<HTMLDivElement | null>(null);
  const [resetAutocomplete, setResetAutocomplete] = useState(false);
  const [clientValidation, setClientValidation] = useState<TClientValidation>({
    name: true,
    phone: true,
    email: true,
    address: true,
  });
  const [image, setImage] = useState<File | undefined>(undefined);

  const handleImage = (e: any) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
      return files[0];
    }
    return undefined;
  };

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

  useEffect(() => {
    getAutocomplete(autocompleteRef, "600px", setState);
  }, [resetAutocomplete]);

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
          <div id="autocomplete" ref={autocompleteRef} />
          <div>
            <label htmlFor="image">Upload Image:</label>
            <input
              type="file"
              id="image"
              className="border border-black"
              onChange={handleImage}
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
