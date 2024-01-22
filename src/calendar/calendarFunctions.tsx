import { NavigateFunction } from "react-router-dom";
import { ProjectType, TProject } from "../types";
import { DateMethods } from "./calendarTypes";

//  Gets details about current month  //
const getMonthDetails = (currentDay: Date) => {
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

//  Renders Calendar cells  //
export const renderDays = (
  currentDay: Date,
  model: any,
  navigate: NavigateFunction,
) => {
  const days = [];
  const { startingWeekday, totalDaysInMonth, totalDaysInPrevMonth } =
    getMonthDetails(currentDay);
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

      const { project } = isProjectDate(cellDate, model);
      const cellStyle = {
        width: "calc(100% / 7)", // Each cell takes 1/7 of the container's width
        height: "80px", // Each cell takes 1/6 of the container's height
      };

      week.push(
        <td
          key={`${cellDate.getTime()}`}
          className={`relative border border-gray-300 p-2 ${
            i === 0 && j < startingWeekday
              ? "text-red-600"
              : dayCounter <= totalDaysInMonth + 1
              ? ""
              : "text-red-600"
          }`}
          style={cellStyle}
        >
          <p className="absolute left-0 top-0">{dayValue}</p>
          {project && (
            <div
              className={`h-[40%] w-full cursor-pointer rounded-sm p-1 text-xs text-white ${
                project.projectType === ProjectType.Other
                  ? "bg-red-500"
                  : project.projectType === ProjectType.Lights
                  ? "bg-blue-500"
                  : "bg-green-500"
              }`}
              onClick={() => navigate(`/project/${project.id}`)}
            >
              {project.projectName}
            </div>
          )}
        </td>,
      );
    }
    days.push(<tr key={`week-${i}`}>{week}</tr>);
  }
  return days;
};

//  Checks if date rendered in Calendar coincides with a project date  //
const isProjectDate = (cellDate: Date, model: TProject[]) => {
  const projectObject = model.find(
    (project: any) =>
      cellDate >= project.projectStartDate &&
      cellDate <= project.projectEndDate,
  );
  return { project: projectObject };
};

//  Sets displayed Calendar month forward or backward  //
export const changeMonth = (
  currentDay: Date,
  setCurrentDay: React.Dispatch<React.SetStateAction<Date>>,
  operator: "+" | "-",
) => {
  const changedMonth = new Date(currentDay);
  {
    operator === "+"
      ? changedMonth.setMonth(currentDay.getMonth() + 1)
      : changedMonth.setMonth(currentDay.getMonth() - 1);
  }
  setCurrentDay(changedMonth);
};

//  Handles Calendar month and year dropdown selections  //
export const handleTimeChange = (
  e: React.ChangeEvent<HTMLSelectElement>,
  dateMethod: keyof DateMethods,
  currentDay: Date,
  setCurrentDay: React.Dispatch<React.SetStateAction<Date>>,
) => {
  const selectedTime = parseInt(e.target.value);
  const setTime = new Date(currentDay);
  setTime[dateMethod](selectedTime);
  setCurrentDay(setTime);
};
