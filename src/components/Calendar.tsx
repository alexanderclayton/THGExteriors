import React, { useState } from "react";
import {
  changeMonth,
  handleTimeChange,
  renderDays,
} from "../calendar/calendarFunctions";
import { months, weekdays } from "../calendar/calendarTypes";
import { useNavigate } from "react-router-dom";

interface ICalendarProps {
  header: string;
  model: any;
}

export const Calendar: React.FC<ICalendarProps> = ({ header, model }) => {
  const [currentDay, setCurrentDay] = useState<Date>(new Date());
  const navigate = useNavigate();
  return (
    <div className="text-center">
      <h1 className="mb-4 text-2xl font-bold">{header}</h1>
      <div className="mb-4 flex items-center justify-center">
        <button
          className="mr-2 bg-blue-500 px-4 py-2 text-white"
          onClick={() => changeMonth(currentDay, setCurrentDay, "-")}
        >
          Prev
        </button>
        <h2 className="text-xl">
          <select
            className="mx-2 border-gray-300 p-2"
            value={currentDay.getMonth()}
            onChange={(e) =>
              handleTimeChange(e, "setMonth", currentDay, setCurrentDay)
            }
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
            onChange={(e) =>
              handleTimeChange(e, "setFullYear", currentDay, setCurrentDay)
            }
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
          onClick={() => changeMonth(currentDay, setCurrentDay, "+")}
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
        <tbody>{renderDays(currentDay, model, navigate)}</tbody>
      </table>
      <button onClick={() => console.log(model[0].projectStartDate)}>
        Start
      </button>
      <button onClick={() => console.log(model[0].projectEndDate)}>End</button>
    </div>
  );
};
