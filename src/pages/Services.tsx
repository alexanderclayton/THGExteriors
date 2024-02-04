//import//
import { useNavigate } from "react-router-dom";
import { ServiceCard } from "../components/ServiceCard";

export const Services = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen items-center justify-around">
      <ServiceCard title="Painting" />
      <ServiceCard title="Exteriors [placeholder]" />
      <ServiceCard
        title="Christmas Lights"
        onClick={() => navigate("/holiday-heroes")}
      />
    </div>
  );
};
