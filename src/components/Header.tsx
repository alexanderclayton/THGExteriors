// Header.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/THG Small (2).png";
import { AdminNavbar } from "./AdminNavbar";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export const Header = () => {
  const { user } = useAuth();

  return (
    <header className="w-full bg-gray-900 text-white shadow-md">
      <div className="mx-auto px-4 py-4">
        <div className="flex w-full items-center justify-between">
          <Link to="/">
            <img src={Logo} alt="THG logo" className="h-8" />
          </Link>
          <nav className="mt-4 items-center space-x-4 md:mt-0 md:flex">
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
            <Link to="/about" className="hover:text-gray-300">
              About
            </Link>
            <Link to="/services" className="hover:text-gray-300">
              Services
            </Link>
            <Link to="/contact" className="hover:text-gray-300">
              Contact
            </Link>
            {user && <AdminNavbar />}
            {!user ? (
              <Link to="/signin" className="hover:text-gray-300">
                Sign In
              </Link>
            ) : (
              <button onClick={() => signOut(auth)}>Logout</button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
