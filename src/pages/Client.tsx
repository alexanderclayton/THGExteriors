//import//
import { FirebaseError } from "firebase/app";
import { useState, useEffect } from "react";
import { collection, doc, getDoc, setDoc, addDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";

type TClient = {
  name: string;
  phone: string;
  email: string;
  address: string;
};

type TProject = {
  clientId: string;
  projectName: string;
  projectDate: string;
  paid: boolean;
};

export const Client = () => {
  const params = useParams();
  const [client, setClient] = useState<TClient>({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
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
    }
  };

  useEffect(() => {
    getClient();
  }, []);

  return (
    <div>
      <div>
        <p>{client.name}</p>
        <p>{client.phone}</p>
        <p>{client.email}</p>
        <p>{client.address}</p>
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
