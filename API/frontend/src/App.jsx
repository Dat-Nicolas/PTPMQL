import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import MainLayout from "./layouts/Mainlayout";
import AuthLayout from "./layouts/AuthLayout";

import Person from "./components/Person";
import Student from "./components/Student";
import HeThongPhanPhoi from "./components/HeThongPhanPhoi";
import Daily from "./components/Daily";
import Employee from "./components/Employee";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
// import RolePermissionsPage from "./pages/RolePermissionsPage";
// import UserRolesPage from "./pages/UserRolesPage";
import UserRole from "./components/UserRole";
import RolePermission from "./components/RolePermission";

import God from "./components/God";
import OAuthSuccess from "./components/OAuthSuccess";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth layout */}
        <Route element={<AuthLayout />}>
          <Route path="/oauth-success" element={<OAuthSuccess />} />
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
          <Route path="/userrole" element={<UserRole />} />
          <Route path="/rolepermission" element={<RolePermission />} />
          {/* <Route path="/userrole" element={<UserRolesPage />} /> */}
          {/* <Route path="/rolepermission" element={<RolePermissionsPage />} /> */}
          <Route path="/home" element={<Home />} />
          <Route path="/God" element={<God />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
