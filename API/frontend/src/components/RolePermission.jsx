import React, { useEffect, useState } from "react";
import axios from "axios";

function RolePermission() {
  const [rolePermissions, setRolePermissions] = useState([]);
  const [roles, setRoles] = useState([]);
  const [roleId, setRoleId] = useState("");
  const [permission, setPermission] = useState("");

  // Lấy tất cả RolePermissions và Roles khi component mount
  useEffect(() => {
    getAllRolePermissions();
    getAllRoles();
  }, []);

  const getAllRolePermissions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/role-permissions");
      setRolePermissions(res.data);
    } catch (err) {
      console.error("Lỗi lấy danh sách RolePermissions:", err);
    }
  };

  const getAllRoles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/Role");
      setRoles(res.data);
    } catch (err) {
      console.error("Lỗi lấy danh sách Roles:", err);
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post("http://localhost:5000/api/role-permissions", {
        roleId,
        permission,
      });
      getAllRolePermissions(); // cập nhật lại danh sách
      setRoleId("");
      setPermission("");
    } catch (err) {
      console.error("Lỗi tạo RolePermission:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/role-permissions/${id}`);
      getAllRolePermissions(); // cập nhật lại danh sách
    } catch (err) {
      console.error("Lỗi xóa RolePermission:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Role Permissions</h1>

      {/* Form tạo mới */}
      <div className="flex items-center gap-4 mb-4">
        <select
          className="border p-2 rounded"
          value={roleId}
          onChange={(e) => setRoleId(e.target.value)}
        >
          <option value="">Chọn một Role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          className="border p-2 rounded"
          placeholder="Permission"
          value={permission}
          onChange={(e) => setPermission(e.target.value)}
        />

        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create
        </button>
      </div>

      {/* Bảng hiển thị RolePermissions */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Role ID</th>
            <th className="border p-2">Permission</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {rolePermissions.map((rp) => (
            <tr key={rp.id}>
              <td className="border p-2">{rp.id}</td>
              <td className="border p-2">{rp.roleId}</td>
              <td className="border p-2">{rp.permission}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(rp.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RolePermission;
