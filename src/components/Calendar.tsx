import React, { useState } from "react";

interface ICalendarProps {
  header: string;
}

export const Calendar: React.FC<ICalendarProps> = ({ header }) => {
  const [currentDay, setCurrentDay] = useState<Date>(new Date());
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
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

  const getMonthDetails = () => {
    const firstDayOfMonth = new Date(
      currentDay.getFullYear(),
      currentDay.getMonth(),
      1,
    );
    const lastDayOfMonth = new Date(
      currentDay.getFullYear(),
      currentDay.getMonth() + 1,
      0,
    );
    const lastDayOfPrevMonth = new Date(
      currentDay.getFullYear(),
      currentDay.getMonth(),
      0,
    );
    const startingWeekday = firstDayOfMonth.getDay();
    const totalDaysInMonth = lastDayOfMonth.getDate();
    const totalDaysInPrevMonth = lastDayOfPrevMonth.getDate();
    return { startingWeekday, totalDaysInMonth, totalDaysInPrevMonth };
  };

  const renderDays = () => {
    const days = [];
    const { startingWeekday, totalDaysInMonth, totalDaysInPrevMonth } =
      getMonthDetails();
    let dayCounter = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        const prevMonthDays = totalDaysInPrevMonth - (startingWeekday - j) + 1;
        const nextMonthDays = dayCounter - totalDaysInMonth;

        let dayValue: string;
        let cellDate: Date;
        if (i === 0 && j < startingWeekday) {
          dayValue = prevMonthDays.toString();
          cellDate = new Date(
            currentDay.getFullYear(),
            currentDay.getMonth() - 1,
            prevMonthDays,
          );
        } else if (dayCounter <= totalDaysInMonth) {
          dayValue = dayCounter.toString();
          cellDate = new Date(
            currentDay.getFullYear(),
            currentDay.getMonth(),
            dayCounter,
          );
          dayCounter++;
        } else {
          dayValue = nextMonthDays.toString();
          cellDate = new Date(
            currentDay.getFullYear(),
            currentDay.getMonth() + 1,
            nextMonthDays,
          );
          dayCounter++;
        }
        week.push(
          <td
            key={`${cellDate.getTime()}`}
            className={`border border-gray-300 p-2 ${
              i === 0 && j < startingWeekday
                ? "text-red-600"
                : dayCounter <= totalDaysInMonth + 1
                ? ""
                : "text-red-600"
            }`}
            onClick={() => console.log(cellDate)}
          >
            {dayValue}
          </td>,
        );
      }
      days.push(<tr key={`week-${i}`}>{week}</tr>);
    }
    return days;
  };

  const changeMonth = (operator: "+" | "-") => {
    const changedMonth = new Date(currentDay);
    {
      operator === "+"
        ? changedMonth.setMonth(currentDay.getMonth() + 1)
        : changedMonth.setMonth(currentDay.getMonth() - 1);
    }
    setCurrentDay(changedMonth);
  };

  interface DateMethods {
    setMonth: (month: number) => void;
    setFullYear: (year: number) => void;
  }

  const handleTimeChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    dateMethod: keyof DateMethods,
  ) => {
    const selectedTime = parseInt(e.target.value);
    const setTime = new Date(currentDay);
    setTime[dateMethod](selectedTime);
    setCurrentDay(setTime);
  };

  return (
    <div className="text-center">
      <h1 className="mb-4 text-2xl font-bold">{header}</h1>
      <div className="mb-4 flex items-center justify-center">
        <button
          className="mr-2 bg-blue-500 px-4 py-2 text-white"
          onClick={() => changeMonth("-")}
        >
          Prev
        </button>
        <h2 className="text-xl">
          <select
            className="mx-2 border-gray-300 p-2"
            value={currentDay.getMonth()}
            onChange={(e) => handleTimeChange(e, "setMonth")}
          >
            {months.map((month, index) => (
              <option key={index} value={index}>
                {month}
              </option>
            ))}
          </select>
          <select
            className="mx-2 border-gray-300 p-2"
            value={currentDay.getFullYear()}
            onChange={(e) => handleTimeChange(e, "setFullYear")}
          >
            {Array.from({ length: 10 }, (_, index) => (
              <option key={index} value={currentDay.getFullYear() - 5 + index}>
                {currentDay.getFullYear() - 5 + index}
              </option>
            ))}
          </select>
        </h2>
        <button
          className="ml-2 bg-blue-500 px-4 py-2 text-white"
          onClick={() => changeMonth("+")}
        >
          Next
        </button>
      </div>
      <table className="mx-auto table-fixed">
        <thead>
          <tr>
            {weekdays.map((weekday) => (
              <th key={weekday} className="border border-gray-300 p-2">
                {weekday}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{renderDays()}</tbody>
      </table>
      <button>Click</button>
    </div>
  );
};
