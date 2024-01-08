import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TProject } from "../types";
import { getDocuments } from "../services";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export const AllProjects = () => {
  const navigate = useNavigate();
  const [allProjects, setAllProjects] = useState<TProject[]>([]);

  const mapProjectDocument = (
    doc: QueryDocumentSnapshot<DocumentData>,
  ): TProject => ({
    id: doc.id,
    clientId: doc.data().clientId,
    projectName: doc.data().projectName,
    projectDate: doc.data().projectDate,
    paid: doc.data().paid,
    imageUrl: doc.data().imageUrl,
  });

  const setAllProjectsDocs = (data: TProject[]) => {
    setAllProjects(data);
  };

  useEffect(() => {
    getDocuments("projects", mapProjectDocument, setAllProjectsDocs);
  }, []);

  return (
    <div>
      <p>Projects</p>
      {allProjects.map((project) => (
        <div
          key={project.id}
          className="border border-black hover:cursor-pointer"
          onClick={() => navigate(`/project/${project.id}`)}
        >
          <p>
            <span className="font-bold">Project Name: </span>{" "}
            {project.projectName}
          </p>
          <p>
            <span className="font-bold">Project Date: </span>{" "}
            {project.projectDate}
          </p>
        </div>
      ))}
    </div>
  );
};
