import { useState } from "react";
import { compareBy, handleSort } from "../helpers";
import { ISortProps, TModels } from "../types";

export const Sort = <T extends TModels>({
  model,
  setModel,
  sortBy,
  sortTitle,
  setHighlight,
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
          () => setHighlight(sortBy),
        )
      }
    >
      {sortTitle}
    </button>
  );
};
