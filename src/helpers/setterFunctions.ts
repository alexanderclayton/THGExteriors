import { RadarAddress } from "radar-sdk-js/dist/types";
import { TClient, TProject, BidStatus, ProjectType, TExpense, ExpenseType, PaymentType, ProjectStatus } from "../types";
import { Params } from "react-router-dom";
import { mapClientDocument, queryDocuments } from "../services";
import { arraysAreEqual } from ".";

//  Reset TClient state variable to clear form fields after adding document to Firebase  //
export const resetClients = (setState: React.Dispatch<React.SetStateAction<TClient>>) => {
    setState({
      clientFirstName: "",
      clientLastName: "",
      clientPhone: 0,
      clientEmail: "",
      clientAddress: {} as RadarAddress,
      notes: [],
      imageUrl: ""
    });
};

//  Reset TProject state variable to clear form fields after adding document to Firebase  //
export const resetProject = (
    setState: React.Dispatch<React.SetStateAction<TProject>>,
    params?: Readonly<Params<string>>
) => {
    setState({
      projectClientId: params?.id as string,
      projectName: "",
      projectStartDate: new Date(),
      projectEndDate: new Date(),
      projectPaid: false,
      projectPaymentType: PaymentType.None,
      projectBid: { sent: false, status: BidStatus.Tentative, amount: 0},
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
    expensePaymentType: PaymentType.None,
    expenseDate: new Date(),
    expenseVendor: "",
    expenseDescription: "",
    expenseProjectId: "",
    imageUrl: ""
  })
}

//  Set model state variable when retrieving information from Firebase  //
export const setModelData = <T>(
  setData: React.Dispatch<React.SetStateAction<T>>,
  model: T
) => {
  setData(model)
}

//  Sets array of TClient associated with existing projects on initial page render //
export const setProjectClients = (
  iteratedArray: TProject[],
  setFunction: React.Dispatch<React.SetStateAction<TClient[]>>
) => {
  let projectClients: string[] = [];
  for (let i = 0; i < iteratedArray.length; i++) {
    projectClients.push(iteratedArray[i].projectClientId);
  }
  if (projectClients.length > 0) {
    queryDocuments<TClient>(
      "clients",
      "__name__",
      "in",
      projectClients,
      mapClientDocument,
      setFunction,
    );
  }
};

//  Sets array of TClient associated with existing projects after project filter  //
export const setFilteredProjectClientsArray = (
  iteratedArray: TProject[],
  arrayToFilter: TClient[],
  arrayFilter: TClient[],
  setFunction: React.Dispatch<React.SetStateAction<TClient[]>>
  
) => {
  let projectClients: string[] = [];
  for (let i = 0; i < iteratedArray.length; i++) {
    projectClients.push(iteratedArray[i].projectClientId);
  }
  if (projectClients.length > 0) {
    const filteredArray = arrayToFilter.filter((client) =>
      projectClients.includes(client.id as string),
    );
    if (!arraysAreEqual(arrayFilter, filteredArray, "id")) {
      setFunction(filteredArray);
    } else {
      console.log("skipping array state update");
    }
  }
};