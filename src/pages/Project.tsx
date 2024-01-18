//import//
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TProject, BidStatus, ProjectType, TClient, TExpense } from "../types";
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

export const Project = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<TProject>({
    clientId: "",
    projectName: "",
    projectDate: new Date(),
    paid: false,
    bid: { sent: false, status: BidStatus.Tentative, amount: 0 },
    projectType: ProjectType.Other,
    notes: [],
    imageUrl: "",
  });
  const [expenses, setExpenses] = useState<TExpense[]>([]);
  const [update, setUpdate] = useState<boolean>(false);

  const setProjectData = (data: TProject) => {
    setProject(data);
  };

  const setExpensesData = (data: TExpense[]) => {
    setExpenses(data);
  };

  useEffect(() => {
    getDocument<TProject>(
      "projects",
      params,
      mapProjectDocument,
      setProjectData,
    );
    queryDocuments<TExpense>(
      "expenses",
      "projectId",
      params,
      mapExpenseDocument,
      setExpensesData,
    );
  }, []);

  return (
    <div>
      <div>
        <p>{project.projectDate.toDateString()}</p>
        <p>{project.projectName}</p>
        <div className="border border-black">
          <p className="font-bold">Expenses:</p>
          {expenses.map((expense) => (
            <div key={expense.id} className="flex border border-black">
              <p>{expense.expenseDate.toDateString()}</p>
              <p>${expense.expenseAmount}</p>
              <p>{expense.vendor}</p>
              <p>{expense.description}</p>
            </div>
          ))}
        </div>
      </div>
      <button onClick={() => setUpdate(!update)}>Update</button>
      {update && (
        <UpdateProject
          params={params}
          project={project}
          setProject={setProject}
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
      <Notes
        model={project}
        collectionName="projects"
        params={params}
        mapFunction={mapProjectDocument}
        setState={
          setProject as React.Dispatch<React.SetStateAction<TClient | TProject>>
        }
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
