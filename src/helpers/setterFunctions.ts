import { RadarAddress } from "radar-sdk-js/dist/types";
import { TClient, TProject, BidStatus, ProjectType, TExpense, ExpenseType, PaymentType, ProjectStatus } from "../types";
import { Params } from "react-router-dom";

//  Reset TClient state variable to clear form fields after adding document to Firebase  //
export const resetClients = (setState: React.Dispatch<React.SetStateAction<TClient>>) => {
    setState({
      name: "",
      phone: 0,
      email: "",
      address: {} as RadarAddress,
      notes: [],
      imageUrl: ""
    });
};

//  Reset TProject state variable to clear form fields after adding document to Firebase  //
export const resetProject = (
    setState: React.Dispatch<React.SetStateAction<TProject>>,
    params: Readonly<Params<string>>
) => {
    setState({
      clientId: params.id as string,
      projectName: "",
      projectStartDate: new Date(),
      projectEndDate: new Date(),
      paid: false,
      bid: { sent: false, status: BidStatus.Tentative, amount: 0},
      projectType: ProjectType.Other,
      projectStatus: ProjectStatus.Upcoming,
      notes: [],
      imageUrl: ""
    });
};

//  Reset TExpense state variable to clear form fields after adding document to Firebase  //
export const resetExpense = (
  setState: React.Dispatch<React.SetStateAction<TExpense>>
) => {
  setState({
    expenseType: ExpenseType.None,
    expenseAmount: 0,
    paymentType: PaymentType.None,
    expenseDate: new Date(),
    vendor: "",
    description: "",
    projectId: ""
  })
}

//  Set model state variable when retrieving information from Firebase  //
export const setModelData = <T>(
  setData: React.Dispatch<React.SetStateAction<T>>,
  model: T
) => {
  setData(model)
}