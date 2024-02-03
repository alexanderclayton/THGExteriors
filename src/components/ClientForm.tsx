//import//
import { useRef, useState } from "react";
import {
  handleChange,
  handleImage,
  resetClients,
  validateSubmit,
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
  const imageRef = useRef<HTMLInputElement>(null);
  const [resetAutocomplete, setResetAutocomplete] = useState(false);
  const [clientValidation, setClientValidation] = useState<TClientValidation>({
    clientFirstName: true,
    clientLastName: true,
    clientPhone: true,
    clientEmail: true,
    clientAddress: true,
  });
  const [image, setImage] = useState<File | undefined>(undefined);
  const [imageThumbnail, setImageThumbnail] = useState("");

  return (
    <div>
      <form
        onSubmit={(e) =>
          validateSubmit(
            e,
            "clients",
            clientValidation,
            model,
            setState,
            setAllState,
            resetClients,
            mapClientDocument,
            params,
            image,
            imageRef,
            formType,
            update,
            setUpdate,
            setUpdatedState,
            resetAutocomplete,
            setResetAutocomplete,
          )
        }
      >
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
            <div>
              <label htmlFor="image">Upload Image:</label>
              <input
                type="file"
                id="image"
                ref={imageRef}
                className="border border-black"
                onChange={(e) => handleImage(e, setImage, setImageThumbnail)}
              />
            </div>
            <img
              src={imageThumbnail}
              alt="thumbnail"
              className="h-40 w-40 rounded-lg object-cover"
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
