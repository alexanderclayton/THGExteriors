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
} from "../types";
import {
  getDocument,
  mapProjectDocument,
  queryDocuments,
  mapExpenseDocument,
} from "../services";
import { Notes } from "../components/Notes";
import { ProjectInfo } from "../components/ProjectInfo";
import { ProjectExpenses } from "../components/ProjectExpenses";

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

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gray-100">
      <div className="mb-4 flex w-full justify-between rounded-lg bg-white px-8 py-4 shadow-md">
        <ProjectInfo model={project} setModel={setProject} params={params} />
        {project.imageUrl !== undefined && (
          <img src={project.imageUrl} alt="project exterior" />
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
