import { useEffect, useState } from "react";
import {
  changeMonth,
  handleTimeChange,
  renderDays,
} from "../calendar/calendarFunctions";
import { months, weekdays } from "../calendar/calendarTypes";
import { CalendarModal } from "./CalendarModal";
import { ICalendarProps, TProject } from "../types";

export const Calendar = ({ header, model }: ICalendarProps) => {
  const [currentDay, setCurrentDay] = useState<Date>(new Date());
  const [projectArray, setProjectArray] = useState<TProject[]>([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setModal(projectArray.length > 0);
  }, [projectArray]);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex h-4/5 w-4/5 flex-col items-center justify-center">
        <div className="flex h-full w-full flex-col">
          <h1 className="mb-4 text-center text-3xl font-bold text-gray-800">
            {header}
          </h1>
          <div className="mb-4 flex items-center justify-center">
            <button
              onClick={() => changeMonth(currentDay, setCurrentDay, "-")}
              className="mr-2 rounded-md bg-blue-500 px-4 py-2 text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Prev
            </button>
            <h2 className="flex items-center text-xl">
              <select
                value={currentDay.getMonth()}
                onChange={(e) =>
                  handleTimeChange(e, "setMonth", currentDay, setCurrentDay)
                }
                className="mx-2 cursor-pointer rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                {months.map((month, index) => (
                  <option key={index} value={index}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                value={currentDay.getFullYear()}
                onChange={(e) =>
                  handleTimeChange(e, "setFullYear", currentDay, setCurrentDay)
                }
                className="mx-2 cursor-pointer rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                {Array.from({ length: 10 }, (_, index) => (
                  <option
                    key={index}
                    value={currentDay.getFullYear() - 5 + index}
                  >
                    {currentDay.getFullYear() - 5 + index}
                  </option>
                ))}
              </select>
            </h2>
            <button
              onClick={() => changeMonth(currentDay, setCurrentDay, "+")}
              className="ml-2 rounded-md bg-blue-500 px-4 py-2 text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Next
            </button>
          </div>
          <table className="mx-auto h-full w-full table-fixed">
            <thead>
              <tr>
                {weekdays.map((weekday) => (
                  <th key={weekday} className="border border-gray-300 p-2">
                    {weekday}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="h-full">
              {renderDays(currentDay, model, setProjectArray)}
            </tbody>
          </table>
        </div>
        {modal && <CalendarModal model={projectArray} />}
      </div>
    </div>
  );
};
