import { Params } from "react-router-dom";
import { TClient } from ".";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export interface IFormProps<T> {
    legend: string;
    setState: React.Dispatch<React.SetStateAction<T>>;
    formSubmit: (e: React.FormEvent, image?: any) => void;
    model: T;
    autocompleteRef?: React.MutableRefObject<HTMLDivElement | null>
    submit: string; 
}

export interface IUpdateModelProps<T> {
    params: Readonly<Params<string>>;
    model: T;
    setFunction: React.Dispatch<React.SetStateAction<T>>;
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    update: boolean;
}

export interface INotesProps<T> {
    model: T;
    collectionName: string;
    params: Readonly<Params<string>>;
    mapFunction: (doc: QueryDocumentSnapshot<DocumentData>) => T;
    setFunction: React.Dispatch<React.SetStateAction<T>>
}

export interface IMapProps<T> {
    radarFunction: (mapRef: React.MutableRefObject<HTMLDivElement | null>, model: T) => void,
    model: T
}

export interface IAutocompleteProps {
    setState: React.Dispatch<React.SetStateAction<TClient>>;
    resetAutocomplete: boolean;
}