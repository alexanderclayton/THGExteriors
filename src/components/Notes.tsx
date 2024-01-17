import { useState } from "react";
import { updateDocument } from "../services";
import { INotesProps, TClient, TProject } from "../types";

export const Notes: React.FC<INotesProps<TClient | TProject>> = ({
  model,
  collectionName,
  params,
  mapFunction,
  setState,
}) => {
  const [note, setNote] = useState("");

  return (
    <>
      <div>
        {model.notes !== undefined
          ? model.notes.map((data, index: number) => (
              <div key={index} className="flex">
                <p>{data}</p>
                <button
                  onClick={() =>
                    updateDocument(
                      collectionName,
                      params,
                      model,
                      mapFunction,
                      setState,
                      undefined,
                      undefined,
                      undefined,
                      note,
                      setNote,
                      index,
                    )
                  }
                >
                  Delete
                </button>
              </div>
            ))
          : null}
      </div>
      <div>
        <label htmlFor="note">Note</label>
        <input
          type="text"
          id="note"
          name="note"
          className="border border-black"
          onChange={(e) => setNote(e.target.value)}
          value={note}
        />
        <button
          onClick={() =>
            updateDocument(
              collectionName,
              params,
              model,
              mapFunction,
              setState,
              undefined,
              undefined,
              undefined,
              note,
              setNote,
            )
          }
        >
          Add Note
        </button>
      </div>
    </>
  );
};
