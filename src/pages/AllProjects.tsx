import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TClient, TExpense, TProject } from "../types";
import { getDocuments } from "../services";
import { mapProjectDocument } from "../services";
import { Map } from "../components/Map";
import { getMapWithMarkers } from "../radar";
import { SearchFilter } from "../components/SearchFilter";
import { setFilteredProjectClientsArray, setProjectClients } from "../helpers";

export const AllProjects = () => {
  const navigate = useNavigate();
  const [allProjects, setAllProjects] = useState<TProject[]>([]);
  const [allProjectClients, setAllProjectClients] = useState<TClient[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<TProject[]>([]);
  const [filteredProjectClients, setFilteredProjectClients] = useState<
    TClient[]
  >([]);

  useEffect(() => {
    getDocuments<TProject>("projects", mapProjectDocument, setAllProjects);
  }, []);

  useEffect(() => {
    if (allProjects.length > 0) {
      setProjectClients(allProjects, setAllProjectClients);
      setFilteredProjects(allProjects);
    }
  }, [allProjects]);

  useEffect(() => {
    if (allProjectClients.length > 0) {
      setFilteredProjectClientsArray(
        filteredProjects,
        allProjectClients,
        filteredProjectClients,
        setFilteredProjectClients,
      );
    }
  }, [allProjectClients, filteredProjects]);

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
      {filteredProjectClients.length > 0 && (
        <Map radarFunction={getMapWithMarkers} model={filteredProjectClients} />
      )}
    </div>
  );
};
