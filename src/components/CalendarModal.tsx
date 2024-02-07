import { useNavigate } from "react-router-dom";
import { ICalendarModalProps } from "../types";

export const CalendarModal = ({
  model,
  modalDate,
  toggle,
  setToggle,
}: ICalendarModalProps) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full rounded-lg bg-white p-8 shadow-lg sm:w-96">
        <h2 className="mb-4 text-xl font-bold">{modalDate.toDateString()}</h2>
        {model.map((project) => (
          <div
            key={project.id}
            className="mb-4 cursor-pointer rounded-md border border-gray-300 p-4 transition duration-300 hover:border-primary-500"
            onClick={() => navigate(`/project/${project.id}`)}
          >
            <h3 className="mb-1 text-lg font-semibold">
              {project.projectName}
            </h3>
            <p className="text-sm text-gray-600">
              Start Date: {project.projectStartDate.toDateString()}
            </p>
            <p className="text-sm text-gray-600">
              End Date: {project.projectEndDate.toDateString()}
            </p>
          </div>
        ))}
        <button
          onClick={() => setToggle(!toggle)}
          className="block w-full rounded-md bg-primary-500 py-2 text-white transition duration-300 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          Close
        </button>
      </div>
    </div>
  );
};
