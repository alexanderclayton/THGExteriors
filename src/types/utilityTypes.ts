import { RadarAddress } from "radar-sdk-js/dist/types";
import { TModels } from ".";

export type TCredentials = {
    email: string;
    password: string;
};

export type TClientValidation = {
    clientFirstName: boolean,
    clientLastName: boolean,
    clientPhone: boolean,
    clientEmail: boolean,
    clientAddress: boolean,
}

export type TProjectValidation = {
    validate: boolean
}

export type TExpenseValidation = {
    validate: boolean
}

export type TModelsValidation = TClientValidation | TProjectValidation | TExpenseValidation

export type TableHeader<T extends TModels> = {
    property: keyof T;
    sortTitle: string;
    nested?: keyof RadarAddress;
};
