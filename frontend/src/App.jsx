import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Person from "./components/Person";
import Student from "./components/Student";
import HeThongPhanPhoi from "./components/HeThongPhanPhoi";
import Daily from "./components/Daily";
import Home from "./components/Home";
function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/person" element={<Person />} />
            <Route path="/student" element={<Student />} />
            <Route path="/hethongphanphoi" element={<HeThongPhanPhoi />} />
            <Route path="/daily" element={<Daily />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;