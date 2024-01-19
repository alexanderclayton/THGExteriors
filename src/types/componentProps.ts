import { Params } from "react-router-dom";
import { TClient, TExpense, TProject } from ".";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export interface IClientFormProps {
    legend: string;
    setState: React.Dispatch<React.SetStateAction<TClient>>;
    formSubmit: (e: React.FormEvent, image: any) => void;
    client: TClient;
    autocompleteRef?: React.MutableRefObject<HTMLDivElement | null>
    submit: string;
}

export interface IProjectFormProps {
    legend: string;
    setState: React.Dispatch<React.SetStateAction<TProject>>;
    formSubmit: (e: React.FormEvent, image: any) => void;
    project: TProject;
    submit: string;
  }

export interface IExpenseFormProps {
    legend: string;
    setState: React.Dispatch<React.SetStateAction<TExpense>>;
    formSubmit: (e: React.FormEvent) => void;
    expense: TExpense;
    submit: string;
}

export interface IUpdateClientProps {
    params: Readonly<Params<string>>;
    client: TClient;
    setClient: React.Dispatch<React.SetStateAction<TClient>>;
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    update: boolean;
}

export interface IUpdateProjectProps {
    params: Readonly<Params<string>>;
    project: TProject;
    setProject: React.Dispatch<React.SetStateAction<TProject>>;
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    update: boolean;
}

export interface IUpdateExpenseProps {
    params: any;
    expense: TExpense;
    setExpense: any;
    setUpdate: any;
    update: boolean;
}

export interface INotesProps<T> {
    model: T;
    collectionName: string;
    params: Readonly<Params<string>>;
    mapFunction: (doc: QueryDocumentSnapshot<DocumentData>) => T;
    setState: React.Dispatch<React.SetStateAction<T>>;
}

export interface IMapProps<T> {
    radarFunction: (mapRef: React.MutableRefObject<HTMLDivElement | null>, model: T) => void,
    model: T
}

export interface IAutocompleteProps {
    setState: React.Dispatch<React.SetStateAction<TClient>>;
    resetAutocomplete: boolean;
}