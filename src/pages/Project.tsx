//import//
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TProject } from "../types";
import { getDocument, uploadImage, deleteDocument, deleteProjectFields } from "../services";
import { UpdateProject } from "../components/UpdateProject";

export const Project = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<TProject>({
    clientId: "",
    projectName: "",
    projectDate: "",
    paid: false,
    imageUrl: "",
  });

  const [update, setUpdate] = useState<boolean>(false);

  const setProjectData = (data: TProject) => {
    setProject(data);
  };

  useEffect(() => {
    getDocument("projects", params, setProjectData);
  }, []);

  const [image, setImage] = useState<File | null>(null);

  const handleProjectImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };

  const setProjectImageState = (url: string) => {
    setProject((prevProject) => ({
      ...prevProject,
      imageUrl: url,
    }));
  };

  return (
    <div>
      <div>
        <p>{project.projectDate}</p>
        <p>{project.projectName}</p>
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
      <label htmlFor="image">Upload Image:</label>
      <input
        type="file"
        id="image"
        className="border border-black"
        onChange={handleProjectImageChange}
      />
      <button
        onClick={() =>
          uploadImage(image, setProjectImageState, "projects", params)
        }
      >
        Upload Image to Storage
      </button>
      {project.imageUrl === undefined ? (
        <p>No Project Image</p>
      ) : (
        <img src={project.imageUrl} alt="project exterior" />
      )}
    </div>
  );
};
