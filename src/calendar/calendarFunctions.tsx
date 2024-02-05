import { TProject } from "../types";
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
  model: TProject[],
  setProjectArray: React.Dispatch<React.SetStateAction<TProject[]>>,
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

      const { projects } = isProjectDate(cellDate, model);
      const isCurrentDay =
        cellDate.getFullYear() === currentDay.getFullYear() &&
        cellDate.getMonth() === currentDay.getMonth() &&
        cellDate.getDate() === currentDay.getDate();

      week.push(
        <td
          key={`${cellDate.getTime()}`}
          className={`relative border border-gray-300 p-2 ${
            isCurrentDay
              ? "border-2 border-blue-800 font-bold"
              : i === 0 && j < startingWeekday
              ? "text-gray-400"
              : dayCounter <= totalDaysInMonth + 1
              ? "font-bold"
              : "text-gray-400"
          } ${projects[0] ? "cursor-pointer bg-blue-100" : ""}`}
          onClick={projects[0] && (() => setProjectArray(projects))}
        >
          <p className="absolute left-0 top-0">{dayValue}</p>
        </td>,
      );
    }
    days.push(<tr key={`week-${i}`}>{week}</tr>);
  }
  return days;
};

//  Checks if date rendered in Calendar coincides with a project date  //
const isProjectDate = (cellDate: Date, model: TProject[]) => {
  const projectObject = model.filter(
    (project) =>
      cellDate >= project.projectStartDate &&
      cellDate <= project.projectEndDate,
  );
  return { projects: projectObject };
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
