import React from "react";
import { updateDocument } from "../services";
import { INotesProps, TModels } from "../types";

export const Notes = <T extends TModels>({
  model,
  collectionName,
  params,
  mapFunction,
  setFunction,
}: INotesProps<T>) => {
  const [note, setNote] = React.useState("");

  return (
    <>
      <div>
        {"notes" in model && model.notes !== undefined
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
                      setFunction,
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
              setFunction,
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
