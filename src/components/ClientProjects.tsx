//import//

import { Params } from "react-router-dom";
import { TProject } from "../types";
import { ProjectForm } from "./ProjectForm";
import { ProjectCard } from "./ProjectCard";
import { LuPlusCircle } from "react-icons/lu";

export interface IModelDependentsProps<T> {
  model: T;
  setModel: React.Dispatch<React.SetStateAction<T>>;
  setAllModel: React.Dispatch<React.SetStateAction<T[]>>;
  cardModel: T[];
  params: Readonly<Params<string>>;
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ClientProjects = ({
  model,
  setModel,
  setAllModel,
  cardModel,
  params,
  toggle,
  setToggle,
}: IModelDependentsProps<TProject>) => {
  return (
    <div className="mr-4 flex w-1/2 flex-col">
      <div className="mb-4 flex items-center">
        <p className="text-2xl font-semibold text-gray-800">Projects</p>
        {!toggle && (
          <LuPlusCircle
            size={25}
            onClick={() => setToggle(!toggle)}
            className="ml-4 text-green-600 duration-300 hover:scale-125 hover:cursor-pointer"
          />
        )}
        {toggle && (
          <ProjectForm
            legend="Add Project"
            model={model}
            setState={setModel}
            setAllState={setAllModel}
            submit="submit form"
            toggle={toggle}
            setToggle={setToggle}
            params={params}
          />
        )}
      </div>
      <ProjectCard model={cardModel} />
    </div>
  );
};
