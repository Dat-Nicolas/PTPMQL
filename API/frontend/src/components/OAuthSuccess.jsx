import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OAuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");
    const expires = params.get("expires");
    const email = params.get("email");
    const userName = params.get("userName");

    if (accessToken && refreshToken) {
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refresh-token", refreshToken);
      localStorage.setItem(
        "user",
        JSON.stringify({ email, userName, expires })
      );

      navigate("/home");
    } else {
      alert("Xác thực thất bại.");
      navigate("/login");
    }
  }, [navigate]);

  return <p>Đang xử lý đăng nhập...</p>;
}
