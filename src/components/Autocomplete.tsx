import { useEffect, useRef } from "react";
import { getAutocomplete } from "../radar";
import { IAutocompleteProps } from "../types";

export const Autocomplete = ({
  setState,
  resetAutocomplete,
}: IAutocompleteProps) => {
  const autocompleteRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    getAutocomplete(autocompleteRef, "600px", setState);
  }, [resetAutocomplete]);
  return <div id="autocomplete" ref={autocompleteRef} />;
};
