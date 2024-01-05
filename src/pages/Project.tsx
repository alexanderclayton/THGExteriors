//import//
import { FirebaseError } from "firebase/app";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { TProject } from "../types";

export const Project = () => {
  const params = useParams();
  const [project, setProject] = useState<TProject>({
    clientId: "",
    projectName: "",
    projectDate: "",
    paid: false,
  });

  const getProject = async () => {
    try {
      const docSnap = await getDoc(doc(db, "projects", `${params.id}`));
      if (docSnap.exists()) {
        setProject({ ...docSnap.data() } as TProject);
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error(error.message);
      }
      console.error(error);
    }
  };

  useEffect(() => {
    getProject();
  }, []);

  return (
    <div>
      <p>{project.projectDate}</p>
      <p>{project.projectName}</p>
    </div>
  );
};
