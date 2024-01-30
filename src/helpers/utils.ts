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

export const compareBy = <T>(property: keyof T) => (a: T, b: T): number => {
  return (a[property] as string).localeCompare(b[property] as string);
};

export const handleSort = <T>(
  model: T[],
  compareFunction: (a: T, b: T) => number,
  setFunction: React.Dispatch<React.SetStateAction<T[]>>
  ) => {
  const sorted = [...model].sort(compareFunction);
  setFunction(sorted);
};