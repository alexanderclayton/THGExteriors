//import//
import { useState } from "react";
import { handleChange } from "../helpers";
import { IClientFormProps, TClientValidation } from "../types";

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
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isFormValid = Object.values(clientValidation).every(
      (isValid) => isValid,
    );
    if (isFormValid) {
      formSubmit(e);
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
        </fieldset>
        <input type="submit" value={submit} />
      </form>
      <button onClick={() => console.log(clientValidation)}>Test</button>
      <button onClick={() => console.log(client)}>Client</button>
    </div>
  );
};
