import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

type TProject = {
  id?: string;
  clientId: string;
  projectName: string;
  projectDate: string;
  paid: boolean;
};

export const AllProjects = () => {
  const navigate = useNavigate();
  const [allProjects, setAllProjects] = useState<TProject[]>([]);

  const getProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "projects"));
      let docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        clientId: doc.data().clientId,
        projectName: doc.data().projectName,
        projectDate: doc.data().projectDate,
        paid: doc.data().paid,
      })) as TProject[];
      setAllProjects(docs);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error(error.message);
      }
      console.error(error);
    }
  };

  useEffect(() => {
    getProjects();
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
