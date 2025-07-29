import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Mật khẩu không khớp");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/account/register", form);
      alert("Đăng ký thành công");
      navigate("/login");
    } catch (err) {
      alert("Đăng ký thất bại");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto flex flex-col">
      <h2 className="text-xl font-bold mb-4">Đăng ký</h2>

      <input
        type="text"
        placeholder="UserName"
        value={form.userName}
        onChange={(e) => setForm({ ...form, userName: e.target.value })}
        className="w-full p-2 border rounded mb-3"
      />

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full p-2 border rounded mb-3"
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="w-full p-2 border rounded mb-3"
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
        className="w-full p-2 border rounded mb-3"
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">Đăng ký</button>

      <Link className="hover:underline mt-2" to="/login">
        Nếu bạn đã có tài khoản, hãy nhấn vào đây để đăng nhập
      </Link>
    </form>
  );
}
