import { Params } from "react-router-dom";
import { TClient, TExpense, TModels, TProject, TableHeader } from ".";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import React from "react";

export interface IFormProps<T> {
    legend: string;
    model: T;
    setState: React.Dispatch<React.SetStateAction<T>>;
    setAllState?: React.Dispatch<React.SetStateAction<T[]>>
    submit: string; 
    toggle?: boolean
    setToggle?: React.Dispatch<React.SetStateAction<boolean>>
    autocompleteRef?: React.MutableRefObject<HTMLDivElement | null>
    params?: Readonly<Params<string>>
    setUpdatedState?: React.Dispatch<React.SetStateAction<T>>
    formType?: string
}

export interface IUpdateModelProps<T> {
    params: Readonly<Params<string>>;
    model: T;
    setFunction: React.Dispatch<React.SetStateAction<T>>;
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

export interface ISearchFilterProps<T> {
    model: T[];
    placeholder: string
    setFilteredModel: React.Dispatch<React.SetStateAction<T[]>>;
    filterProperty: keyof T;
    additionalFilterProperty?: keyof T
}

export interface ICalendarProps {
    header: string;
    model: TProject[];
}

export interface ICalendarModalProps {
    model: TProject[];
    modalDate: Date
    toggle: boolean
    setToggle: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IProjectDropdownProps {
    expense: TExpense;
    setState: React.Dispatch<React.SetStateAction<TExpense>>;
}

export interface ISortProps<T> {
    model: T[];
    setModel: React.Dispatch<React.SetStateAction<T[]>>;
    sortBy: keyof T;
    sortTitle: string
    setHighlight: any
}

export interface ITableProps<T extends TModels> {
    header: TableHeader<T>[];
    model: T[];
    setModel: React.Dispatch<React.SetStateAction<T[]>>;
    navigateUrl: string;
}