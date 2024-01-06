//import//
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TClient, TProject } from "../types";
import { getClient, getClientProjects, addProject } from "../services";
import { UpdateClient } from "../components/UpdateClient";

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
  const [update, setUpdate] = useState<boolean>(false);

  const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProject((prevProject) => ({
      ...prevProject,
      [id]: value,
    }));
  };

  useEffect(() => {
    getClient(params, setClient);
    getClientProjects(params, setClientProjects);
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
      <button
        onClick={() =>
          addProject(project, setProject, params, () =>
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
    </div>
  );
};
