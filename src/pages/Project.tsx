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
    <div>
      <div>
        <p>{project.projectStartDate.toDateString()}</p>
        <p>{project.projectEndDate.toDateString()}</p>
        <p>{project.projectName}</p>
        <p>{project.projectStatus}</p>
        <div className="border border-black">
          <p className="font-bold">Expenses:</p>
          {projectExpenses.map((expense) => (
            <div key={expense.id} className="flex border border-black">
              <p>{expense.expenseDate.toDateString()}</p>
              <p>${expense.expenseAmount}</p>
              <p>{expense.expenseVendor}</p>
              <p>{expense.expenseDescription}</p>
            </div>
          ))}
        </div>
      </div>
      {project.projectClientId !== "" && (
        <UpdateProject
          params={params}
          model={project}
          setFunction={setProject}
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
      {!toggleAdd && (
        <button onClick={() => setToggleAdd(!toggleAdd)}>Add Expense</button>
      )}
      {toggleAdd && (
        <ExpenseForm
          legend="Add Expense"
          model={expense}
          setState={setExpense}
          setAllState={setProjectExpenses}
          submit="Add Expense!"
          toggle={toggleAdd}
          setToggle={setToggleAdd}
          params={params}
        />
      )}
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
    </div>
  );
};
