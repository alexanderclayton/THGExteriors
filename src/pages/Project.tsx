//import//
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TProject, TClient } from "../types";
import { getProject, deleteProject } from "../services";
import { UpdateProject } from "../components/UpdateProject";
import { FirebaseError } from "firebase/app";
import { storage } from "../firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

  const uploadImage = async () => {
    if (image == null) return;
    try {
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);
      const downloadUrl = await getDownloadURL(imageRef);

      setProject((prevState) => ({
        ...prevState,
        imageUrl: downloadUrl,
      }));

      console.log("image uploaded");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error(error.message);
      }
      console.log(error);
    }
  };

  const showState = () => {
    console.log("imageUrl", typeof project.imageUrl, project.imageUrl);
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
      <button onClick={uploadImage}>Upload Image to Storage</button>
      <button onClick={showState}>State</button>
    </div>
  );
};
