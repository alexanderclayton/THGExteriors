import { useNavigate } from "react-router-dom";
import { TProject } from "../types";

export interface IModelCardProps<T> {
  model: T;
}

export const ProjectCard = ({ model }: IModelCardProps<TProject[]>) => {
  const navigate = useNavigate();
  return (
    <div className="flex overflow-x-auto">
      {model.map((project) => (
        <div
          key={project.id}
          className="mb-4 mr-4 w-72 flex-shrink-0 transform cursor-pointer rounded-md border border-gray-300 p-4 transition duration-300 ease-in-out hover:scale-105"
          onClick={() => navigate(`/project/${project.id}`)}
        >
          <p className="mb-2 truncate text-lg font-semibold text-gray-800">
            {project.projectName}
          </p>
          <p className="mb-1 text-gray-600">
            <span className="font-semibold">Start Date:</span>{" "}
            {new Date(project.projectStartDate).toLocaleDateString()}
          </p>
          <p className="mb-1 text-gray-600">
            <span className="font-semibold">End Date:</span>{" "}
            {new Date(project.projectEndDate).toLocaleDateString()}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Paid:</span>{" "}
            {project.projectPaid ? "Yes" : "No"}
          </p>
        </div>
      ))}
    </div>
  );
};
