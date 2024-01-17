import { Link } from "react-router-dom";

export const AdminNavbar = () => {
  return (
    <nav>
      <Link to="/">Dashboard</Link>
      <Link to="allclients">Clients</Link>
      <Link to="/allprojects">Projects</Link>
      <Link to="/allexpenses">Expenses</Link>
    </nav>
  );
};
