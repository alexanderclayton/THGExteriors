export const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
export const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "Decemeber",
];


//  Interface used in changeMonth calendar function  //
export interface DateMethods {
    setMonth: (month: number) => void;
    setFullYear: (year: number) => void;
}