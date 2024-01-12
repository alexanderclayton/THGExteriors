//import//
import { Link } from "react-router-dom";
import Logo from "../assets/THG Small (2).png";

export const Header = () => {
  return (
    <>
      <div className="flex justify-between">
        <img src={Logo} alt="thg logo" className="h-8" />
        <div>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </>
  );
};
