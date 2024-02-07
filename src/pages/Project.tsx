//import//
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  TProject,
  BidStatus,
  ProjectType,
  TExpense,
  ProjectStatus,
  PaymentType,
  ExpenseType,
  TClient,
} from "../types";
import {
  getDocument,
  mapProjectDocument,
  queryDocuments,
  mapExpenseDocument,
  mapClientDocument,
} from "../services";
import { Notes } from "../components/Notes";
import { ProjectInfo } from "../components/ProjectInfo";
import { ProjectExpenses } from "../components/ProjectExpenses";
import { FaRegImage } from "react-icons/fa6";
import { RadarAddress } from "radar-sdk-js/dist/types";

export const Project = () => {
  const params = useParams();
  const [project, setProject] = useState<TProject>({
    projectClientId: "",
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
  const [expense, setExpense] = useState<TExpense>({
    expenseType: ExpenseType.None,
    expenseAmount: 0,
    expensePaymentType: PaymentType.None,
    expenseDate: new Date(),
    expenseVendor: "",
    expenseDescription: "",
    expenseProjectId: params.id,
    imageUrl: "",
  });
  const [projectClient, setProjectClient] = useState<TClient>({
    clientFirstName: "",
    clientLastName: "",
    clientPhone: 0,
    clientEmail: "",
    clientAddress: {} as RadarAddress,
    imageUrl: "",
    notes: [],
  });
  const [projectExpenses, setProjectExpenses] = useState<TExpense[]>([]);
  const [toggleAdd, setToggleAdd] = useState(false);

  useEffect(() => {
    getDocument<TProject>("projects", params, mapProjectDocument, setProject);
    queryDocuments<TExpense>(
      "expenses",
      "expenseProjectId",
      "==",
      params.id as string,
      mapExpenseDocument,
      setProjectExpenses,
    );
  }, []);

  useEffect(() => {
    if (project.projectClientId !== "") {
      getDocument(
        "clients",
        project.projectClientId,
        mapClientDocument,
        setProjectClient,
      );
    }
  }, [project.projectClientId]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gray-100">
      <div className="mb-4 flex w-full justify-between rounded-lg bg-white px-8 py-4 shadow-md">
        <ProjectInfo
          model={project}
          setModel={setProject}
          params={params}
          secondModel={projectClient}
        />
        {project.imageUrl !== "" ? (
          <img
            src={project.imageUrl}
            alt="project exterior"
            className="max-h-[240px] max-w-[240px] rounded-md object-cover"
          />
        ) : (
          <FaRegImage size={240} className="text-gray-400" />
        )}
      </div>
      <div className="flex w-full px-8">
        <ProjectExpenses
          model={expense}
          setModel={setExpense}
          setAllModel={setProjectExpenses}
          cardModel={projectExpenses}
          params={params}
          toggle={toggleAdd}
          setToggle={setToggleAdd}
        />
        <div className="ml-4 flex w-1/2 flex-col">
          <p className="mb-2 text-2xl font-semibold text-gray-800">Notes:</p>
          <Notes
            model={project}
            collectionName="projects"
            params={params}
            mapFunction={mapProjectDocument}
            setFunction={setProject}
          />
        </div>
      </div>
    </div>
  );
};
