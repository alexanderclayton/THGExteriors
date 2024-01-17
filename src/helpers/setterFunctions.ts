import { TClient, TProject, BidStatus, ProjectType, TExpense, ExpenseType, PaymentType } from "../types";
import { Params } from "react-router-dom";

export const resetClients = (setState: React.Dispatch<React.SetStateAction<TClient>>) => {
    setState({
      name: "",
      phone: 0,
      email: "",
      address: "",
      city: "",
      state: "",
      zip: 0,
      notes: [],
      imageUrl: ""
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
      bid: { sent: false, status: BidStatus.Tentative, amount: 0},
      projectType: ProjectType.Other,
      notes: [],
      imageUrl: ""
    });
};

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