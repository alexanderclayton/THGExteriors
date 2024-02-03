import React, { useState } from "react";
import { compareBy, handleSort } from "../helpers";
import { TModels } from "../types";

interface ISortProps<T> {
  model: T[];
  setModel: React.Dispatch<React.SetStateAction<T[]>>;
  sortBy: keyof T;
  sortTitle: string
}

export const Sort = <T extends TModels>({
  model,
  setModel,
  sortBy,
  sortTitle,
}: ISortProps<T>) => {
  const [isAscending, setIsAscending] = useState(true);
  return (
    <button
      onClick={() =>
        handleSort(
          model,
          compareBy(sortBy),
          setModel,
          isAscending,
          setIsAscending,
        )
      }
    >
      {sortTitle}
    </button>
  );
};
