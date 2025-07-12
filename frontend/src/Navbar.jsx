import { Link, useLocation } from "react-router-dom";
import { FaUser, FaGraduationCap, FaSitemap, FaStore } from "react-icons/fa";

function Navbar() {
  const location = useLocation();

  const navItems = [
    { to: "/person", label: "Người dùng", icon: <FaUser /> },
    { to: "/student", label: "Sinh viên", icon: <FaGraduationCap /> },
    { to: "/hethongphanphoi", label: "Hệ thống phân phối", icon: <FaSitemap /> },
    { to: "/daily", label: "Đại lý", icon: <FaStore /> },
  ];

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-purple-800 to-indigo-900 text-white flex flex-col p-6 shadow-lg">
      <h2 className="text-2xl font-extrabold mb-8 text-center tracking-wide">
        🚀 PTPMQL App
      </h2>
      <nav className="flex flex-col gap-4">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 ${
              location.pathname === item.to
                ? "bg-yellow-400 text-gray-900 font-bold"
                : "hover:bg-purple-700 hover:text-yellow-300"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Navbar;
