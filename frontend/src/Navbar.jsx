import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaGraduationCap, FaSitemap, FaStore, FaSignOutAlt } from "react-icons/fa";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

 const handleLogout = async () => {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      await fetch("http://localhost:5000/api/account/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user"); // nếu bạn đang lưu user riêng
    navigate("/");
  } catch (error) {
    console.error("Logout error:", error);
    localStorage.removeItem("token");
    navigate("/");
  }
};


  const navItems = [
    { to: "/person", label: "Người dùng", icon: <FaUser /> },
    { to: "/student", label: "Sinh viên", icon: <FaGraduationCap /> },
    { to: "/hethongphanphoi", label: "Hệ thống phân phối", icon: <FaSitemap /> },
    { to: "/daily", label: "Đại lý", icon: <FaStore /> },
    { to: "/employee", label: "Công nhân", icon: <FaStore /> },
  ];

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-purple-800 to-indigo-900 text-white flex flex-col p-6 shadow-lg justify-between">
      <div>
        <Link
          to="/home"
          className="text-2xl font-extrabold mb-8 text-center tracking-wide block"
        >
          🚀 PTPMQL App
        </Link>
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

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-8 flex items-center gap-3 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-300"
      >
        <FaSignOutAlt />
        <span>Đăng xuất</span>
      </button>
    </div>
  );
}

export default Navbar;
