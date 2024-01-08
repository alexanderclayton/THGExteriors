//import//
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TProject } from "../types";
import { getProject, deleteProject, uploadImage } from "../services";
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

  useEffect(() => {
    getProject(params, setProject);
  }, []);

  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };

  const setImageState = (url: string) => {
    setProject((prevState) => ({
      ...prevState,
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
      <button onClick={() => deleteProject(params, navigate)}>Delete</button>
      <label htmlFor="image">Upload Image:</label>
      <input
        type="file"
        id="image"
        className="border border-black"
        onChange={handleImageChange}
      />
      <button onClick={() => console.log("image", typeof image, image)}>
        Image
      </button>
      <button
        onClick={() => uploadImage(image, setImageState, "projects", params)}
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
