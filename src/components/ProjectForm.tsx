//import

interface IProjectFormProps {}

export const ProjectForm: React.FC<IProjectFormProps> = ({}) => {
  return (
    <form action="">
      <legend>
        <div>
          <label htmlFor="clientId">Client ID</label>
          <input
            type="text"
            id="clientId"
            name="clientId"
            className="border border-black"
          />
        </div>
        <div>
          <label htmlFor="clientId"></label>
          <input
            type="text"
            id="clientId"
            name="clientId"
            className="border border-black"
          />
        </div>
      </legend>
    </form>
  );
};
