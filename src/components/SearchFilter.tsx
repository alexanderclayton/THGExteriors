//import//
import { useEffect } from "react";
import { ISearchFilterProps, TModels } from "../types";
import { handleSearchFilterChange } from "../helpers";

export const SearchFilter = <T extends TModels>({
  model,
  placeholder,
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
      placeholder={placeholder}
      className="w-full rounded-md border border-primary-500 px-3 py-2 shadow-sm focus-within:border-accent-500 focus-within:ring-2 focus-within:ring-accent-500 focus:outline-none"
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
