import { useEffect, useState } from "react";
import API from "../api/API";
import axios from "axios";

function UserRole() {
  const [id, setId] = useState("");
  const [roles, setRoles] = useState([]); // Danh sách roles từ API
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getAllUserRoles();
    getAllRoles(); // lấy danh sách role từ API
  }, []);

  async function getAllUserRoles() {
    try {
      const res = await API.get("/UserRole");
      setUserRoles(res.data);
    } catch (err) {
      console.error("Lỗi lấy danh sách user-role:", err);
      alert("Không thể tải danh sách quyền người dùng.");
    }
  }

  async function getAllRoles() {
    try {
      const res = await axios.get("http://localhost:5000/api/Role");
      setRoles(res.data); // ví dụ: [{ id: '1', name: 'Admin' }, ...]
    } catch (err) {
      console.error("Lỗi lấy danh sách role:", err);
      alert("Không thể tải danh sách quyền.");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!id.trim() || selectedRoles.length === 0) {
      return alert("Hãy nhập ID và chọn ít nhất một role.");
    }

    try {
      if (isEditing) {
        await API.put(`/UserRole/${id}`, {
          userId: id,
          roles: selectedRoles,
        });
      } else {
        await API.post("/UserRole/AddRolesToUser", {
          userId: id,
          roles: selectedRoles,
        });
      }
      clearForm();
      getAllUserRoles();
    } catch (err) {
      console.error("Lỗi submit:", err.response?.data || err.message);
      alert("Không thể lưu dữ liệu.");
    }
  }

  function handleEdit(entry) {
    setId(entry.id);
    setSelectedRoles(entry.roles || []);
    setIsEditing(true);
  }

  async function handleDelete(userId) {
    if (!confirm("Bạn có chắc muốn xóa?")) return;
    try {
      await API.delete(`/UserRole/${userId}`);
      getAllUserRoles();
    } catch (err) {
      console.error("Lỗi xóa:", err);
      alert("Không thể xóa.");
    }
  }

  function clearForm() {
    setId("");
    setSelectedRoles([]);
    setIsEditing(false);
  }

  function handleSelectChange(e) {
    const selectedOptions = Array.from(e.target.selectedOptions).map((o) => o.value);
    setSelectedRoles(selectedOptions);
  }

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Danh sách User Role</h1>

      <form onSubmit={handleSubmit} className="grid gap-4 mb-6">
        <input
          className="border p-2 rounded"
          placeholder="User ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <select
          multiple
          value={selectedRoles}
          onChange={handleSelectChange}
          className="border p-2 rounded h-32"
        >
          {roles.map((role) => (
            <option key={role.id || role.name} value={role.name}>
              {role.name}
            </option>
          ))}
        </select>

        <div className="flex gap-4">
          <button
            type="submit"
            className={`${isEditing ? "bg-yellow-500" : "bg-green-600"} text-white px-4 py-2 rounded`}
          >
            {isEditing ? "Update" : "Create"}
          </button>
          <button type="button" onClick={clearForm} className="bg-gray-500 text-white px-4 py-2 rounded">
            Clear
          </button>
        </div>
      </form>

      <table className="table-auto w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2">User ID</th>
            <th className="border px-4 py-2">Roles</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userRoles.map((entry) => (
            <tr key={entry.id} className="text-center">
              <td className="border px-4 py-2">{entry.id}</td>
              <td className="border px-4 py-2">{(entry.roles || []).join(", ")}</td>
              <td className="border px-4 py-2">
                <button className="bg-yellow-400 px-3 py-1 rounded mr-2" onClick={() => handleEdit(entry)}>
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(entry.id)}
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

export default UserRole;
