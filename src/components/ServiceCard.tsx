import Placeholder from "../assets/THG Small (2).png";

interface IServiceCardProps {
  title: string;
  description: string;
  onClick?: () => void;
}

export const ServiceCard = ({
  title,
  description,
  onClick,
}: IServiceCardProps) => {
  return (
    <div
      className="m-4 flex h-96 w-72 transform cursor-pointer flex-col items-center justify-center rounded-xl bg-gradient-to-b from-gray-200 to-gray-300 p-6 transition duration-300 hover:scale-105 hover:from-primary-100 hover:to-primary-300 hover:shadow-lg"
      onClick={onClick}
    >
      <img
        src={Placeholder}
        alt="placeholder"
        className="mb-4 h-32 w-auto rounded-full"
      />
      <div className="text-center">
        <h1 className="mb-2 text-lg font-bold text-accent-700">{title}</h1>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};
