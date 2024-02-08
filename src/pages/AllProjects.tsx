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
    <div className="mx-auto flex flex-col items-center px-4 py-8">
      <h1 className="text-primary mb-6 text-3xl font-bold">All Projects</h1>
      <div className="mb-6 flex w-[50%] items-center">
        <SearchFilter
          model={allProjects}
          placeholder="Search Project Name"
          setFilteredModel={setFilteredProjects}
          filterProperty="projectName"
        />
      </div>
      <div className="grid w-full grid-cols-2 grid-rows-3 gap-4 lg:w-[80%] lg:grid-cols-3 lg:grid-rows-1">
        <div className="col-start-1 col-end-3 aspect-[2/1] lg:col-start-1 lg:col-end-3">
          <Table
            header={projectTable}
            model={filteredProjects}
            setModel={setFilteredProjects}
            navigateUrl="project"
          />
        </div>
        <div className="col-start-1 col-end-3 row-start-2 row-end-4 aspect-square lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2">
          {filteredProjectClients.length > 0 && (
            <Map
              radarFunction={getMapWithMarkers}
              model={filteredProjectClients}
            />
          )}
        </div>
      </div>
    </div>
  );
};
