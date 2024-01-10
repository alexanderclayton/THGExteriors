import { Params } from "react-router-dom";
import { TClient, TProject } from ".";

export interface IClientFormProps {
    legend: string;
    setState: React.Dispatch<React.SetStateAction<TClient>>;
    formSubmit: (e: React.FormEvent) => void;
    client: TClient;
    submit: string;
}

export interface IProjectFormProps {
    legend: string;
    setState: React.Dispatch<React.SetStateAction<TProject>>;
    formSubmit: (e: React.FormEvent) => void;
    project: TProject;
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