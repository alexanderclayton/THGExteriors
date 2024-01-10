import { TClient, TProject } from "../types";
import { Params } from "react-router-dom";

export const resetClients = (setState: React.Dispatch<React.SetStateAction<TClient>>) => {
    setState({
      name: "",
      phone: 0,
      email: "",
      address: "",
      imageUrl: "",
    });
};

export const resetProject = (
    setState: React.Dispatch<React.SetStateAction<TProject>>,
    params: Readonly<Params<string>>
) => {
    setState({
      clientId: params.id as string,
      projectName: "",
      projectDate: new Date(),
      paid: false,
      imageUrl: "",
    });
};