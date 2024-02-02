import React from "react";
import { compareBy, handleSort } from "../helpers";
import { TModels } from "../types";

interface ISortProps<T> {
  model: T[];
  setModel: React.Dispatch<React.SetStateAction<T[]>>;
  sortBy: keyof T;
}

export const Sort = <T extends TModels>({
  model,
  setModel,
  sortBy,
}: ISortProps<T>) => {
  return (
    <button onClick={() => handleSort(model, compareBy(sortBy), setModel)}>
      Sort
    </button>
  );
};
