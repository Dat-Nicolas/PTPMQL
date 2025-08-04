// src/components/LoginWithGoogle.jsx
import { useEffect } from "react";

export default function LoginWithGoogle() {
  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: "291284740601-1s97759ahj7vgpc9p76tg6olkio6d2b7.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });

      google.accounts.id.renderButton(
        document.getElementById("google-login-button"),
        { theme: "outline", size: "large" }
      );
    }
  }, []);

  const handleCredentialResponse = (response) => {
    const jwt = response.credential;
    const payload = parseJwt(jwt);

    console.log("Google user info:", payload);

    // Lưu vào localStorage nếu muốn
    localStorage.setItem("token", jwt);
    localStorage.setItem("user", JSON.stringify(payload));

    // Điều hướng sang home
    window.location.href = "/home";
  };

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  return <div id="google-login-button" className="my-4"></div>;
}
