//import//
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TClient,
  TProject,
  BidStatus,
  ProjectType,
  ProjectStatus,
} from "../types";
import {
  getDocument,
  deleteDocument,
  deleteClientFields,
  queryDocuments,
  mapClientDocument,
  mapProjectDocument,
} from "../services";
import { UpdateClient } from "../components/UpdateClient";
import { ProjectForm } from "../components/ProjectForm";
import { RadarAddress } from "radar-sdk-js/dist/types";
import { Map } from "../components/Map";
import { getMap } from "../radar";

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
    projectStartDate: new Date(),
    projectEndDate: new Date(),
    paid: false,
    bid: { sent: false, status: BidStatus.Tentative, amount: 0 },
    projectType: ProjectType.Other,
    projectStatus: ProjectStatus.Upcoming,
    notes: [],
    imageUrl: "",
  });
  const [update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    getDocument<TClient>("clients", params, mapClientDocument, setClient);
    queryDocuments<TProject>(
      "projects",
      "clientId",
      "==",
      params.id as string,
      mapProjectDocument,
      setClientProjects,
    );
  }, []);

  return (
    <div>
      <div>
        <p>{client.name}</p>
        <p>{client.phone.toString()}</p>
        <p>{client.email}</p>
        <p>{client.address.addressLabel}</p>
        {client.address.latitude && (
          <Map radarFunction={getMap} model={client} />
        )}
        <div>
          <p>projects</p>
          {clientProjects.map((project) => (
            <div
              key={project.id}
              className="border border-black hover:cursor-pointer"
              onClick={() => navigate(`/project/${project.id}`)}
            >
              <p>{project.projectName}</p>
              <p>{project.projectStartDate.toDateString()}</p>
              <p>{project.projectEndDate.toDateString()}</p>
              <p>{project.paid}</p>
              <p>{project.id}</p>
            </div>
          ))}
        </div>
      </div>
      <ProjectForm
        legend="Add Project"
        model={project}
        setState={setProject}
        setAllState={setClientProjects}
        submit="submit form"
        params={params}
      />
      <button onClick={() => setUpdate(!update)}>Update</button>
      {update && (
        <UpdateClient
          params={params}
          model={client}
          setFunction={setClient}
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
      <button onClick={() => console.log(client)}>See Client</button>
    </div>
  );
};
