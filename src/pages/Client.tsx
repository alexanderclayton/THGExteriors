//import//
import { FirebaseError } from "firebase/app";
import { useState, useEffect } from "react";
import {
  collection,
  query,
  doc,
  getDoc,
  getDocs,
  where,
  addDoc,
} from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { TClient, TProject } from "../types";

export const Client = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState<TClient>({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [clientProjects, setClientProjects] = useState<TProject[]>([]);
  const [project, setProject] = useState<TProject>({
    clientId: params.id as string,
    projectName: "",
    projectDate: "",
    paid: false,
  });

  const getClient = async () => {
    try {
      const docSnap = await getDoc(doc(db, "clients", `${params.id}`));
      if (docSnap.exists()) {
        setClient({ ...docSnap.data() } as TClient);
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error(error.message);
      }
      console.error(error);
    }
  };

  const getProjects = async () => {
    try {
      const q = query(
        collection(db, "projects"),
        where("clientId", "==", params.id),
      );
      const querySnapshot = await getDocs(q);
      let docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        clientId: doc.data().clientId,
        projectName: doc.data().projectName,
        projectDate: doc.data().projectDate,
        paid: doc.data().paid,
      })) as TProject[];
      setClientProjects(docs);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error(error.message);
      }
      console.error(error);
    }
  };

  const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProject((prevProject) => ({
      ...prevProject,
      [id]: value,
    }));
  };

  const addProject = async () => {
    try {
      await addDoc(collection(db, "projects"), {
        clientId: project.clientId,
        projectName: project.projectName,
        projectDate: project.projectDate,
        paid: project.paid,
      });
      console.log("project added", project.projectName);
      setProject({
        clientId: params.id as string,
        projectName: "",
        projectDate: "",
        paid: false,
      });
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error(error.message);
      }
      console.error(error);
    } finally {
      getProjects();
    }
  };

  useEffect(() => {
    getClient();
    getProjects();
  }, []);

  return (
    <div>
      <div>
        <p>{client.name}</p>
        <p>{client.phone}</p>
        <p>{client.email}</p>
        <p>{client.address}</p>
        <div>
          <p>projects</p>
          {clientProjects.map((project) => (
            <div
              key={project.id}
              className="border border-black hover:cursor-pointer"
              onClick={() => navigate(`/project/${project.id}`)}
            >
              <p>{project.projectName}</p>
              <p>{project.projectDate}</p>
              <p>{project.paid}</p>
              <p>{project.id}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="projectName">Project Name</label>
        <input
          type="text"
          id="projectName"
          onChange={handleProjectChange}
          value={project.projectName}
        />
        <label htmlFor="projectDate">Project Date</label>
        <input
          type="text"
          id="projectDate"
          onChange={handleProjectChange}
          value={project.projectDate}
        />
      </div>
      <button onClick={() => console.log(project)}>check</button>
      <button onClick={addProject}>add project</button>
    </div>
  );
};
