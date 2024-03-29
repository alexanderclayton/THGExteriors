//import//
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Header } from "./components/Header";
import { About } from "./pages/About";
import { Services } from "./pages/Services";
import { Contact } from "./pages/Contact";
import { HolidayHeroes } from "./pages/HolidayHeroes";
import { AllClients } from "./pages/AllClients";
import { Client } from "./pages/Client";
import { Project } from "./pages/Project";
import { AllProjects } from "./pages/AllProjects";
import { Signin } from "./pages/Signin";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AllExpenses } from "./pages/AllExpenses";
import { Expense } from "./pages/Expense";
import { Dashboard } from "./pages/Dashboard";

function App() {
  return (
    <>
      <Router>
        <div className="flex h-screen w-full flex-col">
          <Header />
          <div className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/holiday-heroes" element={<HolidayHeroes />} />
              <Route path="/signin" element={<Signin />} />
              {/* User Authenticated Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/allclients" element={<AllClients />} />
                <Route path="/client/:id" element={<Client />} />
                <Route path="/allprojects" element={<AllProjects />} />
                <Route path="/project/:id" element={<Project />} />
                <Route path="/allexpenses" element={<AllExpenses />} />
                <Route path="/expense/:id" element={<Expense />} />
              </Route>
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
