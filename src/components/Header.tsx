import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/THG Small (2).png";
import { AdminNavbar } from "./AdminNavbar";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export const Header = () => {
  const { user } = useAuth();

  return (
    <header className="relative z-10 w-full bg-background-50 text-text-900 shadow-md">
      <div className="mx-auto px-4 py-4">
        <div className="flex w-full items-center justify-between">
          <Link to="/">
            <img src={Logo} alt="THG logo" className="h-8" />
          </Link>
          <nav className="mt-4 items-center space-x-4 md:mt-0 md:flex">
            <Link
              to="/"
              className="duration-300 hover:scale-110 hover:text-accent-600"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="duration-300 hover:scale-110 hover:text-accent-600"
            >
              About
            </Link>
            <Link
              to="/services"
              className="duration-300 hover:scale-110 hover:text-accent-600"
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="duration-300 hover:scale-110 hover:text-accent-600"
            >
              Contact
            </Link>
            {user && <AdminNavbar />}
            {!user ? (
              <Link
                to="/signin"
                className="duration-300 hover:scale-110 hover:text-accent-600"
              >
                Sign In
              </Link>
            ) : (
              <button
                className="duration-300 hover:scale-110 hover:text-accent-600"
                onClick={() => signOut(auth)}
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
