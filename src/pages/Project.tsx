//import//
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  deleteDocument,
  deleteProjectFields,
  mapProjectDocument,
  queryDocuments,
  mapExpenseDocument,
} from "../services";
import { UpdateProject } from "../components/UpdateProject";
import { Notes } from "../components/Notes";
import { ExpenseForm } from "../components/ExpenseForm";

export const Project = () => {
  const params = useParams();
  const navigate = useNavigate();
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
  const [expenses, setExpenses] = useState<TExpense[]>([]);
  const [update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    getDocument<TProject>("projects", params, mapProjectDocument, setProject);
    queryDocuments<TExpense>(
      "expenses",
      "expenseProjectId",
      "==",
      params.id as string,
      mapExpenseDocument,
      setExpenses,
    );
  }, []);

  return (
    <div>
      <div>
        <p>{project.projectStartDate.toDateString()}</p>
        <p>{project.projectEndDate.toDateString()}</p>
        <p>{project.projectName}</p>
        <p>{project.projectStatus}</p>
        <div className="border border-black">
          <p className="font-bold">Expenses:</p>
          {expenses.map((expense) => (
            <div key={expense.id} className="flex border border-black">
              <p>{expense.expenseDate.toDateString()}</p>
              <p>${expense.expenseAmount}</p>
              <p>{expense.expenseVendor}</p>
              <p>{expense.expenseDescription}</p>
            </div>
          ))}
        </div>
      </div>
      <button onClick={() => setUpdate(!update)}>Update</button>
      {update && (
        <UpdateProject
          params={params}
          model={project}
          setFunction={setProject}
          setUpdate={setUpdate}
          update={update}
        />
      )}
      <button
        onClick={() =>
          deleteDocument(
            "projects",
            params,
            deleteProjectFields,
            navigate,
            "/allprojects",
          )
        }
      >
        Delete
      </button>
      <ExpenseForm
        legend="Add Expense"
        model={expense}
        setState={setExpense}
        setAllState={setExpenses}
        submit="Add Expense!"
      />
      <Notes
        model={project}
        collectionName="projects"
        params={params}
        mapFunction={mapProjectDocument}
        setFunction={setProject}
      />
      {project.imageUrl === undefined ? (
        <p>No Project Image</p>
      ) : (
        <img src={project.imageUrl} alt="project exterior" />
      )}
      <button onClick={() => console.log(project)}>Project</button>
      <button onClick={() => console.log(expenses)}>Expenses</button>
    </div>
  );
};
