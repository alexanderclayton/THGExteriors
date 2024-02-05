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
    <div className="h-screen w-full">
      {projects[0] && <Calendar header="dashboard calendar" model={projects} />}
    </div>
  );
};
