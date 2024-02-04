import Placeholder from "../assets/THG Small (2).png";

interface IServiceCardProps {
  title: string;
  onClick?: () => void;
}

export const ServiceCard = ({ title, onClick }: IServiceCardProps) => {
  return (
    <div
      className="m-4 flex h-72 w-72 transform cursor-pointer items-center justify-center rounded-xl bg-blue-200 p-4 transition duration-300 hover:scale-105 hover:bg-blue-300 hover:shadow-lg"
      onClick={onClick}
    >
      <div className="flex flex-col items-center">
        <img
          src={Placeholder}
          alt="placeholder"
          className="mb-4 h-auto w-full rounded-xl"
        />
        <h1 className="text-center text-lg font-bold">{title}</h1>
      </div>
    </div>
  );
};
