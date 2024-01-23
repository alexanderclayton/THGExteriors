import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TClient, TExpense, TProject } from "../types";
import { getDocuments, mapClientDocument, queryDocuments } from "../services";
import { mapProjectDocument } from "../services";
import { Map } from "../components/Map";
import { getMapWithMarkers } from "../radar";
import { SearchFilter } from "../components/SearchFilter";

export const AllProjects = () => {
  const navigate = useNavigate();
  const [allProjects, setAllProjects] = useState<TProject[]>([]);
  const [allProjectClients, setAllProjectClients] = useState<TClient[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<TProject[]>([]);
  // const [filteredProjectClients, setFilteredProjectClients] = useState<
  //   string[]
  // >([]);
  let projectClients: string[] = [];

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
    getDocuments<TProject>("projects", mapProjectDocument, setAllProjects);
  }, []);

  useEffect(() => {
    setProjectClients();
  }, [allProjects]);

  return (
    <div className="flex">
      <div>
        <p>Projects</p>
        {allProjects[0] && (
          <SearchFilter
            model={allProjects}
            setFilteredModel={
              setFilteredProjects as React.Dispatch<
                React.SetStateAction<TClient[] | TProject[] | TExpense[]>
              >
            }
            filterProperty="projectName"
          />
        )}
        {filteredProjects.map((project) => (
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
              <span className="font-bold">Project Start Date: </span>{" "}
              {project.projectStartDate.toDateString()}
            </p>
            <p>
              <span className="font-bold">Project End Date: </span>{" "}
              {project.projectEndDate.toDateString()}
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