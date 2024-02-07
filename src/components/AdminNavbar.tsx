// AdminNavbar.jsx
import { Link } from "react-router-dom";

export const AdminNavbar = () => {
  return (
    <>
      <Link
        to="/dashboard"
        className="duration-300 hover:scale-110 hover:text-accent-600"
      >
        Dashboard
      </Link>
      <Link
        to="/allclients"
        className="duration-300 hover:scale-110 hover:text-accent-600"
      >
        Clients
      </Link>
      <Link
        to="/allprojects"
        className="duration-300 hover:scale-110 hover:text-accent-600"
      >
        Projects
      </Link>
      <Link
        to="/allexpenses"
        className="duration-300 hover:scale-110 hover:text-accent-600"
      >
        Expenses
      </Link>
    </>
  );
};
