//import//
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import { RadarAddress } from "radar-sdk-js/dist/types";
import { Map } from "../components/Map";
import { getMap } from "../radar";
import { Notes } from "../components/Notes";
import { ClientInfo } from "../components/ClientInfo";
import { ClientProjects } from "../components/ClientProjects";
import { FaRegImage } from "react-icons/fa6";

export const Client = () => {
  const params = useParams();
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
      <div className="mb-4 flex h-[50%] w-full justify-between rounded-lg bg-white px-8 py-4 shadow-md lg:w-[80%]">
        <ClientInfo model={client} setModel={setClient} params={params} />
        <div className="flex items-center justify-center">
          {client.imageUrl === "" ? (
            <FaRegImage size={60} className="text-gray-400" />
          ) : (
            <img
              src={client.imageUrl}
              alt="client home exterior"
              className="aspect-square h-[80%] w-[80%] rounded-md object-cover shadow-md"
            />
          )}
        </div>
        <div className="aspect-square h-full">
          {client.clientAddress.latitude && (
            <Map radarFunction={getMap} model={client} />
          )}
        </div>
      </div>
      <div className="mt-4 flex w-full px-8 lg:w-[80%]">
        <ClientProjects
          model={project}
          setModel={setProject}
          setAllModel={setClientProjects}
          cardModel={clientProjects}
          params={params}
          toggle={toggleAdd}
          setToggle={setToggleAdd}
        />
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
    </div>
  );
};
