//import//
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Header } from "./components/Header";
import { About } from "./pages/About";
import { Services } from "./pages/Services";
import { Contact } from "./pages/Contact";
import { HolidayHeroes } from "./pages/HolidayHeroes";
import { Admin } from "./pages/Admin";
import { AllClients } from "./pages/AllClients";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/holiday-heroes" element={<HolidayHeroes />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/allclients" element={<AllClients />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
