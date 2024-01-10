//import//
import { handleChange } from "../helpers";
import { IClientFormProps } from "../types";

export const ClientForm: React.FC<IClientFormProps> = ({
  legend,
  setState,
  formSubmit,
  client,
  submit,
}) => {
  return (
    <form onSubmit={formSubmit}>
      <fieldset>
        <legend>{legend}</legend>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className="border border-black"
            onChange={(e) => handleChange(e, setState)}
            value={client.name}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="number"
            id="phone"
            name="phone"
            className="border border-black"
            onChange={(e) => handleChange(e, setState)}
            value={client.phone.toString()}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            className="border border-black"
            onChange={(e) => handleChange(e, setState)}
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
            onChange={(e) => handleChange(e, setState)}
            value={client.address}
          />
        </div>
      </fieldset>
      <input type="submit" value={submit} />
    </form>
  );
};
