// AdminNavbar.jsx
import { Link } from "react-router-dom";

export const AdminNavbar = () => {
  return (
    <>
      <Link to="/dashboard" className="hover:text-gray-300">
        Dashboard
      </Link>
      <Link to="/allclients" className="hover:text-gray-300">
        Clients
      </Link>
      <Link to="/allprojects" className="hover:text-gray-300">
        Projects
      </Link>
      <Link to="/allexpenses" className="hover:text-gray-300">
        Expenses
      </Link>
    </>
  );
};
