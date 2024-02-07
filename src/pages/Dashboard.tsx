import { useEffect, useState } from "react";
import { Calendar } from "../components/Calendar";
import { TProject } from "../types";
import { getDocuments, mapProjectDocument } from "../services";

export const Dashboard = () => {
  const [projects, setProjects] = useState<TProject[]>([]);

  useEffect(() => {
    getDocuments("projects", mapProjectDocument, setProjects);
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center bg-background-50">
      <div className="h-full rounded-lg bg-background-50 p-8 shadow-md">
        {projects.length > 0 ? (
          <Calendar header="Dashboard Calendar" model={projects} />
        ) : (
          <p className="text-gray-700">No projects available.</p>
        )}
      </div>
    </div>
  );
};
