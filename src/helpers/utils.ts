import { TClient, TExpense, TModels, TProject, TableHeader } from "../types";

//  Checks two arrays for equality given a property unique to each item in the array  //
export const arraysAreEqual = <T>(arr1: T[], arr2: T[], property: keyof T): boolean => {
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i][property] !== arr2[i][property]) {
        return false;
      }
    }
    return true;
};

export const compareBy = <T extends TModels>(property: keyof T) => (a: T, b: T): number => {
  if (typeof a[property] === 'string') {
    console.log("sorted string")
    return (a[property] as string).localeCompare(b[property] as string);
  } else if (a[property] instanceof Date) {
    console.log("sorted date")
    return (a[property] as Date).getTime() - (b[property] as Date).getTime()
  } else if (typeof a[property] === 'number') {
    console.log("sorted number")
    return (a[property] as number) - (b[property] as number)
  } else {
    console.log("didn't sort")
    return 0;
  }
};

export const handleSort = <T>(
  model: T[],
  compareFunction: (a: T, b: T) => number,
  setFunction: React.Dispatch<React.SetStateAction<T[]>>,
  isAscending: boolean,
  setIsAscending: any
  ) => {
  const sorted = [...model].sort(compareFunction);
  const sortOrder = isAscending ? sorted : sorted.reverse()
  setFunction(sortOrder);
  setIsAscending(!isAscending)
  
};

// Array for setting AllClients.tsx table sorting headers //
export const clientTable: TableHeader<TClient>[] = [
  { property: "clientLastName", sortTitle: "Last Name" },
  { property: "clientFirstName", sortTitle: "First Name" },
  { property: "clientAddress", sortTitle: "Address", nested: "formattedAddress"},
  { property: "clientPhone", sortTitle: "Phone" },
  { property: "clientEmail", sortTitle: "Email" },
]

// Array for setting AllProjects.tsx table sorting headers //
export const projectTable: TableHeader<TProject>[] = [
  { property: "projectName", sortTitle: "Project Name" },
  { property: "projectClientId", sortTitle: "Client" },
  { property: "projectStartDate", sortTitle: "Start Date" },
  { property: "projectEndDate", sortTitle: "End Date" },
  { property: "projectStatus", sortTitle: "Status" },
  { property: "projectType", sortTitle: "Type" },
]

// Array for setting AllExpenses.tsx table sorting headers //
export const expenseTable: TableHeader<TExpense>[] = [
  { property: "expenseDate", sortTitle: "Date" },
  { property: "expenseDescription", sortTitle: "Description" },
  { property: "expenseVendor", sortTitle: "Vendor" },
  { property: "expenseAmount", sortTitle: "Amount" },
  { property: "expensePaymentType", sortTitle: "Payment Type" },
  { property: "expenseType", sortTitle: "Type" },
]

// Renders the value of a TModels property in the AllTModels.tsx page tables //
export const renderValue = (value: any) => {
  if (typeof value === "string" || typeof value === "number") {
    return value;
  } else if (value instanceof Date) {
    return value.toDateString();
  } else {
    return JSON.stringify(value);
  }
};