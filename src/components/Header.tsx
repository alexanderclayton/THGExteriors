//import//
import { Link } from "react-router-dom";
import Logo from "../assets/THG Small (2).png";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-between">
        <img src={Logo} alt="thg logo" className="h-8" />
        <div>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
          <SignedIn>
            <SignOutButton signOutCallback={() => navigate("/")} />
          </SignedIn>
          <SignedOut>
            <SignInButton afterSignInUrl="/admin" />
          </SignedOut>
        </div>
      </div>
    </>
  );
};
