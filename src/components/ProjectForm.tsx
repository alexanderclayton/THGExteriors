//import
import { IProjectFormProps } from "../types";
import { handleDate } from "../helpers";

export const ProjectForm: React.FC<IProjectFormProps> = ({
  legend,
  setState,
  formSubmit,
  project,
  submit,
}) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === "date" ? new Date(handleDate(e)) : value;
    setState((prevProject) => ({
      ...prevProject,
      [name]: newValue,
    }));
  };

  return (
    <form onSubmit={formSubmit}>
      <fieldset>
        <legend>{legend}</legend>
        <div>
          <label htmlFor="projectName">Project Name:</label>
          <input
            type="text"
            id="projectName"
            name="projectName"
            className="border border-black"
            onChange={handleChange}
            value={project.projectName}
          />
        </div>
        <div>
          <label htmlFor="projectDate">Project Date:</label>
          <input
            type="date"
            id="projectDate"
            name="projectDate"
            className="border border-black"
            onChange={handleChange}
            value={project.projectDate.toISOString().split("T")[0]}
          />
        </div>
      </fieldset>
      <input type="submit" value={submit} />
    </form>
  );
};
