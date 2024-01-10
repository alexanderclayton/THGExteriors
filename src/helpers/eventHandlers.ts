
//  Adjusts selected date from input field to register correctly  //
//  Usage: src/components/ProjectForm.tsx  //
//  Usage: src/pages/Client.tsx  //
export const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
  const selectedDate = new Date(e.target.value);
  const adjustedDate = new Date(
    selectedDate.getTime() + selectedDate.getTimezoneOffset() * 60000,
  );
  return adjustedDate;
};
