//import//
import { useState } from "react";
import { handleChange } from "../helpers";
import { IClientFormProps, TClientValidation } from "../types";
import { StateDropdown } from "./StateDropdown";

export const ClientForm: React.FC<IClientFormProps> = ({
  legend,
  setState,
  formSubmit,
  client,
  submit,
}) => {
  const [clientValidation, setClientValidation] = useState<TClientValidation>({
    name: true,
    phone: true,
    email: true,
    address: true,
    city: true,
    state: true,
    zip: true,
  });
  const [image, setImage] = useState<File | null>(null);

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
          <div>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              className="border border-black"
              onChange={(e) => handleChange(e, setState, setClientValidation)}
              value={client.address}
            />
          </div>
          <div>
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              className="border border-black"
              onChange={(e) => handleChange(e, setState, setClientValidation)}
              value={client.city}
            />
          </div>
          <StateDropdown
            client={client}
            setState={setState}
            setClientValidation={setClientValidation}
          />
          <div>
            <label htmlFor="zip">Zip:</label>
            <input
              type="number"
              id="zip"
              name="zip"
              className="border border-black"
              onChange={(e) => handleChange(e, setState, setClientValidation)}
              value={client.zip}
            />
          </div>
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
