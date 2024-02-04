//import//
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TClient,
  TProject,
  BidStatus,
  ProjectType,
  ProjectStatus,
  PaymentType,
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
    clientFirstName: "",
    clientLastName: "",
    clientPhone: 0,
    clientEmail: "",
    clientAddress: {} as RadarAddress,
    notes: [],
    imageUrl: "",
  });
  const [clientProjects, setClientProjects] = useState<TProject[]>([]);
  const [project, setProject] = useState<TProject>({
    projectClientId: params.id as string,
    projectName: "",
    projectStartDate: new Date(),
    projectEndDate: new Date(),
    projectPaid: false,
    projectPaymentType: PaymentType.None,
    projectBid: { sent: false, status: BidStatus.Tentative, amount: 0 },
    projectType: ProjectType.Other,
    projectStatus: ProjectStatus.Upcoming,
    notes: [],
    imageUrl: "",
  });
  const [toggleAdd, setToggleAdd] = useState(false);

  useEffect(() => {
    getDocument<TClient>("clients", params, mapClientDocument, setClient);
    queryDocuments<TProject>(
      "projects",
      "projectClientId",
      "==",
      params.id as string,
      mapProjectDocument,
      setClientProjects,
    );
  }, []);

  return (
    <div>
      <div>
        <p>
          {client.clientLastName}, {client.clientFirstName}
        </p>
        <p>{client.clientPhone.toString()}</p>
        <p>{client.clientEmail}</p>
        <p>{client.clientAddress.addressLabel}</p>
        {client.clientAddress.latitude && (
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
              <p>{project.projectPaid}</p>
              <p>{project.id}</p>
            </div>
          ))}
        </div>
      </div>
      {!toggleAdd && (
        <button onClick={() => setToggleAdd(!toggleAdd)}>Add Project</button>
      )}
      {toggleAdd && (
        <ProjectForm
          legend="Add Project"
          model={project}
          setState={setProject}
          setAllState={setClientProjects}
          submit="submit form"
          toggle={toggleAdd}
          setToggle={setToggleAdd}
          params={params}
        />
      )}
      {client.clientLastName !== "" && (
        <UpdateClient params={params} model={client} setFunction={setClient} />
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
      <button onClick={() => console.log(clientProjects)}>
        See Client Projects
      </button>
    </div>
  );
};
