import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      alert("Sai dữ liệu");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/account/login",
        form
      );
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("refresh-token", res.data.refreshToken);
      localStorage.setItem(
        "user",
        JSON.stringify({
          userName: res.data.user.userName,
          email: res.data.user.email,
          roles: res.data.user.roles,
          expires: res.data.expires,
        })
      );

      navigate("/home");
    } catch (err) {
      alert("Đăng nhập thất bại");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 max-w-md mx-auto flex flex-col"
    >
      <h2 className="text-xl font-bold mb-4">Đăng nhập</h2>

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

      <label className="flex items-center mb-3">
        <input
          type="checkbox"
          checked={form.rememberMe}
          onChange={(e) => setForm({ ...form, rememberMe: e.target.checked })}
          className="mr-2"
        />
        Ghi nhớ đăng nhập
      </label>

      <button className="bg-green-600 text-white px-4 py-2 rounded">
        Đăng nhập
      </button>

      <div className="flex justify-between my-4 gap-3">
        <button
        className="bg-gray-300"
          onClick={() =>
            (window.location.href = "http://localhost:5075/signin-google")
          }
        >
          Đăng nhập bằng Google
        </button>
  
        <button
        className="bg-gray-300"
          onClick={() =>
            (window.location.href = "http://localhost:5000/signin-facebook")
          }
        >
          Đăng nhập bằng Facebook
        </button>
      </div>

      <Link className="hover:underline mt-2" to="/register">
        Nếu bạn chưa có tài khoản, hãy nhấn vào đây để đăng ký
      </Link>
    </form>
  );
}
