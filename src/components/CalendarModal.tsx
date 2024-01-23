//import//
import { useNavigate } from "react-router-dom";
import { TProject } from "../types";

interface ICalendarModalProps {
  model: TProject[];
}

export const CalendarModal: React.FC<ICalendarModalProps> = ({ model }) => {
  const navigate = useNavigate();
  return (
    <div>
      {model.map((project) => (
        <div
          key={project.id}
          className="cursor-pointer border border-black"
          onClick={() => navigate(`/project/${project.id}`)}
        >
          {project.projectName}
          {project.projectStartDate.toDateString()}
          {project.projectEndDate.toDateString()}
        </div>
      ))}
    </div>
  );
};
