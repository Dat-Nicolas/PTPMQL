import axios from "axios";
import { useEffect, useState } from "react";

function Employee() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [employees, setEmployees] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getAllEmployees();
  }, []);

  async function getAllEmployees() {
    try {
      const res = await axios.get("http://localhost:5000/api/Employee");
      if (Array.isArray(res.data)) {
        setEmployees(res.data);
      } else {
        console.error("Dữ liệu trả về không phải mảng:", res.data);
      }
    } catch (err) {
      console.error("Lỗi khi lấy danh sách Employee:", err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim() || !position.trim()) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/Employee/${id}`, {
          id,
          name,
          position,
        });
      } else {
        const res = await axios.post("http://localhost:5000/api/Employee", {
          name,
          position,
        });
        setId(res.data.id);
      }

      clearForm();
      getAllEmployees();
    } catch (err) {
      console.error("Lỗi khi lưu Employee:", err);
    }
  }

  function handleEdit(e) {
    setId(e.id);
    setName(e.name);
    setPosition(e.position);
    setIsEditing(true);
  }

  async function handleDelete(employeeId) {
    if (!confirm("Bạn có chắc muốn xóa bản ghi này?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/Employee/${employeeId}`);
      alert("Xóa bản ghi thành công!");
      getAllEmployees();
    } catch (err) {
      console.error("Lỗi khi xóa:", err);
      alert("Lỗi khi xóa bản ghi: " + err.message);
    }
  }

  function clearForm() {
    setId("");
    setName("");
    setPosition("");
    setIsEditing(false);
  }

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Danh sách Employee</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-6">
        <input
          type="text"
          className="border p-2 rounded bg-gray-100"
          placeholder="Employee ID"
          value={id}
          readOnly
        />
        <input
          type="text"
          className="border p-2 rounded"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="border p-2 rounded"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <div className="flex gap-4">
          <button
            type="submit"
            className={`$${isEditing ? "bg-yellow-500" : "bg-green-600"} text-white bg-green-600 px-4 py-2 rounded`}
          >
            {isEditing ? "Update" : "Create"}
          </button>
          <button
            type="button"
            onClick={clearForm}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Clear
          </button>
        </div>
      </form>

      <table className="table-auto w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Position</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e) => (
            <tr key={e.id} className="text-center">
              <td className="border px-4 py-2">{e.id}</td>
              <td className="border px-4 py-2">{e.name}</td>
              <td className="border px-4 py-2">{e.position}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-yellow-400 px-3 py-1 rounded mr-2"
                  onClick={() => handleEdit(e)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(e.id)}
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

export default Employee;