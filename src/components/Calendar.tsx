import { useEffect, useState } from "react";
import {
  changeMonth,
  handleTimeChange,
  renderDays,
} from "../calendar/calendarFunctions";
import { months, weekdays } from "../calendar/calendarTypes";
import { CalendarModal } from "./CalendarModal";
import { ICalendarProps, TProject } from "../types";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

export const Calendar = ({ header, model }: ICalendarProps) => {
  const [currentDay, setCurrentDay] = useState<Date>(new Date());
  const [projectArray, setProjectArray] = useState<TProject[]>([]);
  const [modalDate, setModalDate] = useState(new Date());
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setModal(projectArray.length > 0);
  }, [projectArray]);

  return (
    <div className="flex h-full w-full items-center justify-center bg-background-50">
      <div className="flex h-4/5 w-4/5 flex-col items-center justify-center">
        <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border-2 border-text-900">
          <h1 className="mb-4 bg-primary-500 text-center text-3xl font-bold text-text-900">
            {header}
          </h1>
          <div className="mb-4 flex items-center justify-center">
            <FaChevronCircleLeft
              size={30}
              onClick={() => changeMonth(currentDay, setCurrentDay, "-")}
              className="text-primary-500 duration-300 hover:cursor-pointer hover:text-primary-700"
            />
            <h2 className="flex items-center text-xl">
              <select
                value={currentDay.getMonth()}
                onChange={(e) =>
                  handleTimeChange(e, "setMonth", currentDay, setCurrentDay)
                }
                className="mx-2 cursor-pointer rounded-md border-gray-300 bg-accent-200 p-2 text-center text-xl shadow-sm focus:border-primary-500 focus:ring-primary-500"
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
                className="mx-2 cursor-pointer rounded-md border-gray-300 bg-accent-200 p-2 text-center text-xl shadow-sm focus:border-primary-500 focus:ring-primary-500"
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
            <FaChevronCircleRight
              size={30}
              onClick={() => changeMonth(currentDay, setCurrentDay, "+")}
              className="text-primary-500 duration-300 hover:cursor-pointer hover:text-primary-700"
            />
          </div>
          <table className="mx-auto h-full w-full table-fixed border border-gray-800">
            <thead className="h-[8%] w-full">
              <tr>
                {weekdays.map((weekday) => (
                  <th
                    key={weekday}
                    className="border border-gray-800 p-1 text-sm font-bold"
                  >
                    {weekday}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="h-[92%]] w-full">
              {renderDays(currentDay, model, setProjectArray, setModalDate)}
            </tbody>
          </table>
        </div>
        {modal && (
          <CalendarModal
            model={projectArray}
            modalDate={modalDate}
            toggle={modal}
            setToggle={setModal}
          />
        )}
      </div>
    </div>
  );
};
