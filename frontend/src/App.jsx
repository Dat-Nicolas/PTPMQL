import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import Person from "./components/Person";
import Student from "./components/Student";
import HeThongPhanPhoi from "./components/HeThongPhanPhoi";
import Daily from "./components/Daily";
import Employee from "./components/Employee";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth layout */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Main layout */}
        <Route element={<MainLayout />}>
          <Route path="/person" element={<Person />} />
          <Route path="/student" element={<Student />} />
          <Route path="/hethongphanphoi" element={<HeThongPhanPhoi />} />
          <Route path="/daily" element={<Daily />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
