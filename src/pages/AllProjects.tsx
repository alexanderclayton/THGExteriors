import { useState, useEffect } from "react";
import { TClient, TProject } from "../types";
import { getDocuments } from "../services";
import { mapProjectDocument } from "../services";
import { Map } from "../components/Map";
import { getMapWithMarkers } from "../radar";
import { SearchFilter } from "../components/SearchFilter";
import {
  projectTable,
  setFilteredProjectClientsArray,
  setProjectClients,
} from "../helpers";
import { Table } from "../components/Table";

export const AllProjects = () => {
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
            placeholder="Search Project Name"
            setFilteredModel={setFilteredProjects}
            filterProperty="projectName"
          />
        )}
        <Table
          header={projectTable}
          model={filteredProjects}
          setModel={setFilteredProjects}
          navigateUrl="project"
        />
      </div>
      {filteredProjectClients.length > 0 && (
        <Map radarFunction={getMapWithMarkers} model={filteredProjectClients} />
      )}
    </div>
  );
};
