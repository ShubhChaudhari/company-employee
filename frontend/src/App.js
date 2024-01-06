import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Redirect,
} from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Company from "./company/Company";
import Employee from "./employee/Employee";
import Navbar from "./navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/dashboard" replace={true} />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route exact path="/companies" element={<Company />} />
          <Route exact path="/employees" element={<Employee />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
