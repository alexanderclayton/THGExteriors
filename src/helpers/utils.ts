import { TModels } from "../types";

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
  setFunction: React.Dispatch<React.SetStateAction<T[]>>
  ) => {
  const sorted = [...model].sort(compareFunction);
  setFunction(sorted);
};