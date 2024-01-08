//import//
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TClient, TProject } from "../types";
import {
  getDocument,
  getClientProjects,
  addDocument,
  deleteDocument,
  uploadImage,
} from "../services";
import { UpdateClient } from "../components/UpdateClient";
import { FieldValue } from "firebase/firestore";

export const Client = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState<TClient>({
    name: "",
    phone: 0,
    email: "",
    address: "",
    imageUrl: "",
  });
  const [clientProjects, setClientProjects] = useState<TProject[]>([]);
  const [project, setProject] = useState<TProject>({
    clientId: params.id as string,
    projectName: "",
    projectDate: "",
    paid: false,
    imageUrl: "",
  });
  const [update, setUpdate] = useState<boolean>(false);

  const [image, setImage] = useState<File | null>(null);

  const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProject((prevProject) => ({
      ...prevProject,
      [id]: value,
    }));
  };

  const handleClientImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };

  const setClientImageState = (url: string) => {
    setClient((prevClient) => ({
      ...prevClient,
      imageUrl: url,
    }));
  };

  const setClientData = (data: TClient) => {
    setClient(data);
  };

  useEffect(() => {
    getDocument("clients", params, setClientData);
    getClientProjects(params, setClientProjects);
  }, []);

  const resetProject = () => {
    setProject({
      clientId: params.id as string,
      projectName: "",
      projectDate: "",
      paid: false,
      imageUrl: "",
    });
  };

  const deleteClientFields = (deleteField: FieldValue) => ({
    name: deleteField,
    phone: deleteField,
    email: deleteField,
    address: deleteField,
    imageUrl: deleteField,
  });

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
      <button
        onClick={() =>
          addDocument("projects", project, resetProject, () =>
            getClientProjects(params, setClientProjects),
          )
        }
      >
        add project
      </button>
      <button onClick={() => setUpdate(!update)}>Update</button>
      {update && (
        <UpdateClient
          params={params}
          client={client}
          setClient={setClient}
          setUpdate={setUpdate}
          update={update}
        />
      )}
      <button
        onClick={() =>
          deleteDocument(
            "clients",
            params,
            deleteClientFields,
            navigate,
            "/allclients",
          )
        }
      >
        Delete Client
      </button>
      <label htmlFor="image">Upload Image:</label>
      <input
        type="file"
        id="image"
        className="border border-black"
        onChange={handleClientImageChange}
      />
      <button
        onClick={() =>
          uploadImage(image, setClientImageState, "clients", params)
        }
      >
        Upload Image to Storage
      </button>
      {client.imageUrl === undefined ? (
        <p>No Project Image</p>
      ) : (
        <img src={client.imageUrl} alt="client home exterior" />
      )}
    </div>
  );
};
