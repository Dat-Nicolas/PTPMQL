import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import LoginWithGoogle from "./LoginWithGoogle";
import LoginWithFacebook from "./LoginWithFacebook";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "", rememberMe: false });
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      setErrorMsg("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/account/login", form);

      if (res.data.success) {
        const { accessToken, refreshToken, expires, user } = res.data.data;

        // Lưu thông tin vào localStorage
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refresh-token", refreshToken);
        localStorage.setItem("user", JSON.stringify({
          userName: user.userName,
          email: user.email,
          roles: user.roles,
          expires: expires,
        }));

        // Điều hướng
        navigate("/home");
      } else {
        setErrorMsg(res.data.message || "Đăng nhập thất bại.");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        const serverMsg = err.response.data.message || err.response.data;
        setErrorMsg(serverMsg);
      } else {
        setErrorMsg("Đăng nhập thất bại.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-[800px] mx-auto flex flex-col">
      <h2 className="text-xl font-bold mb-4">Đăng nhập</h2>

      {errorMsg && <div className="text-red-600 mb-3">{errorMsg}</div>}

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
        <LoginWithGoogle />
        <LoginWithFacebook />
      </div>

      <Link className="hover:underline mt-2" to="/register">
        Nếu bạn chưa có tài khoản, hãy nhấn vào đây để đăng ký
      </Link>
    </form>
  );
}
