import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TClient, TProject } from "../types";
import { getDocuments, mapClientDocument, queryDocuments } from "../services";
import { mapProjectDocument } from "../services";
import { Map } from "../components/Map";
import { getMapWithMarkers } from "../radar";

export const AllProjects = () => {
  const navigate = useNavigate();
  const [allProjects, setAllProjects] = useState<TProject[]>([]);
  const [allProjectClients, setAllProjectClients] = useState<TClient[]>([]);
  let projectClients: string[] = [];

  const setAllProjectsDocs = (data: TProject[]) => {
    setAllProjects(data);
  };

  const setProjectClients = () => {
    for (let i = 0; i < allProjects.length; i++) {
      projectClients.push(allProjects[i].clientId);
    }
    if (projectClients.length > 0) {
      queryDocuments<TClient>(
        "clients",
        "__name__",
        "in",
        projectClients,
        mapClientDocument,
        setAllProjectClients,
      );
      console.log("got clients");
    }
  };

  useEffect(() => {
    getDocuments<TProject>("projects", mapProjectDocument, setAllProjectsDocs);
  }, []);

  useEffect(() => {
    setProjectClients();
  }, [allProjects]);

  return (
    <div className="flex">
      <div>
        <p>Projects</p>
        {allProjects.map((project) => (
          <div
            key={project.id}
            className="border border-black hover:cursor-pointer"
            onClick={() => navigate(`/project/${project.id}`)}
          >
            <p>
              <span className="font-bold">Project Name: </span>{" "}
              {project.projectName}
            </p>
            <p>
              <span className="font-bold">Project Date: </span>{" "}
              {project.projectDate.toDateString()}
            </p>
          </div>
        ))}
      </div>
      {allProjectClients[0] && (
        <Map radarFunction={getMapWithMarkers} model={allProjectClients} />
      )}
    </div>
  );
};
