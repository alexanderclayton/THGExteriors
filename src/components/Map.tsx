import { useEffect, useRef } from "react";
import { IMapProps } from "../types";

export const Map: React.FC<IMapProps<any>> = ({ radarFunction, model }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    radarFunction(mapRef, model);
  }, []);
  return <div id="map" ref={mapRef} className="h-96 w-96" />;
};
