import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-[800px] p-6 bg-white shadow-md rounded-md">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
