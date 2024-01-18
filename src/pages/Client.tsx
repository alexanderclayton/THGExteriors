//import//
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TClient, TProject, BidStatus, ProjectType } from "../types";
import {
  getDocument,
  addDocument,
  deleteDocument,
  deleteClientFields,
  queryDocuments,
  mapClientDocument,
  mapProjectDocument,
} from "../services";
import { UpdateClient } from "../components/UpdateClient";
import { resetProject } from "../helpers";
import { ProjectForm } from "../components/ProjectForm";
import { RadarAddress } from "radar-sdk-js/dist/types";

export const Client = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState<TClient>({
    name: "",
    phone: 0,
    email: "",
    address: {} as RadarAddress,
    notes: [],
    imageUrl: "",
  });
  const [clientProjects, setClientProjects] = useState<TProject[]>([]);
  const [project, setProject] = useState<TProject>({
    clientId: params.id as string,
    projectName: "",
    projectDate: new Date(),
    paid: false,
    bid: { sent: false, status: BidStatus.Tentative, amount: 0 },
    projectType: ProjectType.Other,
    notes: [],
    imageUrl: "",
  });
  const [update, setUpdate] = useState<boolean>(false);

  const setClientData = (data: TClient) => {
    setClient(data);
  };

  const setClientProjectsDocs = (data: TProject[]) => {
    setClientProjects(data);
  };

  useEffect(() => {
    getDocument<TClient>("clients", params, mapClientDocument, setClientData);
    queryDocuments<TProject>(
      "projects",
      "clientId",
      params,
      mapProjectDocument,
      setClientProjectsDocs,
    );
    console.log(clientProjects);
  }, []);

  const formSubmit = (e: React.FormEvent, image: any) => {
    e.preventDefault();
    addDocument<TProject>(
      "projects",
      project,
      () => resetProject(setProject, params),
      () =>
        queryDocuments<TProject>(
          "projects",
          "clientId",
          params,
          mapProjectDocument,
          setClientProjectsDocs,
        ),
      image,
    );
  };

  return (
    <div>
      <div>
        <p>{client.name}</p>
        <p>{client.phone.toString()}</p>
        <p>{client.email}</p>
        <p>{client.address.addressLabel}</p>
        <div>
          <p>projects</p>
          {clientProjects.map((project) => (
            <div
              key={project.id}
              className="border border-black hover:cursor-pointer"
              onClick={() => navigate(`/project/${project.id}`)}
            >
              <p>{project.projectName}</p>
              <p>{project.projectDate.toDateString()}</p>
              <p>{project.paid}</p>
              <p>{project.id}</p>
            </div>
          ))}
        </div>
      </div>
      <ProjectForm
        legend="Add Project"
        setState={setProject}
        formSubmit={formSubmit}
        project={project}
        submit="submit form"
      />
      <button onClick={() => setUpdate(!update)}>Update</button>
      {update && (
        <UpdateClient
          params={params}
          client={client}
          setClient={setClient}
          setUpdate={setUpdate}
          update={update}
        />
      )}
      <button
        onClick={() =>
          deleteDocument(
            "clients",
            params,
            deleteClientFields,
            navigate,
            "/allclients",
          )
        }
      >
        Delete Client
      </button>
      {client.imageUrl === undefined ? (
        <p>No Project Image</p>
      ) : (
        <img src={client.imageUrl} alt="client home exterior" />
      )}
    </div>
  );
};
