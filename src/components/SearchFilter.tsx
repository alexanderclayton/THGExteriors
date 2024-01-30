//import//
import { useEffect } from "react";
import { ISearchFilterProps, TModels } from "../types";
import { handleSearchFilterChange } from "../helpers";

export const SearchFilter = <T extends TModels>({
  model,
  setFilteredModel,
  filterProperty,
  additionalFilterProperty,
}: ISearchFilterProps<T>) => {
  useEffect(() => {
    setFilteredModel(model);
  }, []);

  return (
    <input
      type="text"
      placeholder="Search Name"
      onChange={(e) => {
        !additionalFilterProperty
          ? handleSearchFilterChange(e, model, filterProperty, setFilteredModel)
          : handleSearchFilterChange(
              e,
              model,
              filterProperty,
              setFilteredModel,
              additionalFilterProperty,
            );
      }}
    />
  );
};
