import { useNavigate } from "react-router-dom";
import { ServiceCard } from "../components/ServiceCard";

export const Services = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 md:py-12">
      <h1 className="mb-8 text-3xl font-bold text-gray-800">Our Services</h1>
      <p className="mb-8 text-center text-lg text-gray-700">
        THG Exteriors offers a variety of services tailored to meet your needs,
        ranging from exterior painting to holiday lighting installations. With a
        focus on quality and personalized solutions, THG ensures that our
        clients receive exceptional service and results that exceed
        expectations.
      </p>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <ServiceCard
          title="Painting"
          description="Transform your home with a fresh coat of paint."
          onClick={() => navigate("/painting")}
        />
        <ServiceCard
          title="Exteriors"
          description="Enhance your home's exterior appearance and protection."
          onClick={() => navigate("/exteriors")}
        />
        <ServiceCard
          title="Christmas Lights"
          description="Let us brighten your holidays with professional light installation."
          onClick={() => navigate("/holiday-heroes")}
        />
      </div>
    </div>
  );
};
