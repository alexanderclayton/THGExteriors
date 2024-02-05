import { useEffect, useRef } from "react";
import { IMapProps, TModels } from "../types";

//  Custom hook to ignore changes to model.notes when triggering rerender  //
const useMapEffect = <T extends TModels | TModels[]>(
  radarFunction: (
    mapRef: React.MutableRefObject<HTMLDivElement | null>,
    model: T,
  ) => void,
  model: T,
  mapRef: React.MutableRefObject<HTMLDivElement | null>,
) => {
  if (!Array.isArray(model)) {
    const prevNotesRef = useRef(model.notes);

    useEffect(() => {
      if (model.notes !== prevNotesRef.current) {
        prevNotesRef.current = model.notes;
        return;
      }
      radarFunction(mapRef, model);
    }, [model, radarFunction]);
  } else {
    useEffect(() => {
      radarFunction(mapRef, model);
    }, [model]);
  }
};

export const Map = <T extends TModels | TModels[]>({
  radarFunction,
  model,
}: IMapProps<T>) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  useMapEffect(radarFunction, model, mapRef);
  return <div id="map" ref={mapRef} className="h-96 w-96" />;
};
