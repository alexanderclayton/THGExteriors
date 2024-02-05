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
  queryDocuments,
  mapClientDocument,
  mapProjectDocument,
} from "../services";
import { UpdateClient } from "../components/UpdateClient";
import { ProjectForm } from "../components/ProjectForm";
import { RadarAddress } from "radar-sdk-js/dist/types";
import { Map } from "../components/Map";
import { getMap } from "../radar";
import { FaRegImage } from "react-icons/fa6";
import { Notes } from "../components/Notes";

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
    <div className="flex h-full w-full flex-col items-center justify-center bg-gray-100">
      <div className="mb-4 flex w-full justify-between rounded-lg bg-white px-8 py-4 shadow-md">
        <div className="flex flex-col justify-center">
          <div className="mb-2 flex items-center">
            <p className="mr-4 text-4xl font-bold text-gray-800">
              {client.clientFirstName} {client.clientLastName}
            </p>
            {client.clientLastName !== "" && (
              <UpdateClient
                params={params}
                model={client}
                setFunction={setClient}
              />
            )}
          </div>
          <div className="flex">
            <div className="mr-4">
              <p className="text-gray-600">
                {client.clientAddress.addressLabel}
              </p>
              <p className="text-gray-600">{client.clientPhone}</p>
              <p className="text-gray-600">{client.clientEmail}</p>
            </div>
            <div>
              {client.imageUrl === "" ? (
                <FaRegImage size={60} className="text-gray-400" />
              ) : (
                <img
                  src={client.imageUrl}
                  alt="client home exterior"
                  className="h-32 w-32 rounded-md object-cover shadow-md"
                />
              )}
            </div>
          </div>
        </div>
        <div className="">
          {client.clientAddress.latitude && (
            <Map radarFunction={getMap} model={client} />
          )}
        </div>
      </div>
      <div className="flex w-full px-8">
        <div className="mr-4 flex w-1/2 flex-col">
          <div className="mb-4">
            <p className="mb-2 text-2xl font-semibold text-gray-800">
              Projects:
            </p>
            {!toggleAdd && (
              <button
                className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                onClick={() => setToggleAdd(!toggleAdd)}
              >
                Add Project
              </button>
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
          </div>
          <div className="flex">
            {clientProjects.map((project) => (
              <div
                key={project.id}
                className="mb-4 cursor-pointer rounded-md border border-gray-300 p-4 hover:bg-gray-50"
                onClick={() => navigate(`/project/${project.id}`)}
              >
                <p className="text-lg font-semibold text-gray-800">
                  {project.projectName}
                </p>
                <p className="text-gray-600">
                  Start Date: {project.projectStartDate.toDateString()}
                </p>
                <p className="text-gray-600">
                  End Date: {project.projectEndDate.toDateString()}
                </p>
                <p className="text-gray-600">
                  Paid: {project.projectPaid ? "Yes" : "No"}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="ml-4 flex w-1/2 flex-col">
          <p className="mb-2 text-2xl font-semibold text-gray-800">Notes:</p>
          <Notes
            model={client}
            collectionName="clients"
            params={params}
            mapFunction={mapClientDocument}
            setFunction={setClient}
          />
        </div>
      </div>

      {/*
      DELETE CLIENT DOCUMENT.  ADD SECOND LAYER OF SECURITY
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
      </button>*/}
    </div>
  );
};
