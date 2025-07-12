import axios from "axios";
import { useEffect, useState } from "react";

function Student() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [students, setStudents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getAllStudents();
  }, []);

  async function getAllStudents() {
    try {
      const res = await axios.get("http://localhost:5000/api/Student");
      if (Array.isArray(res.data)) {
        setStudents(res.data);
      } else {
        console.error("Dữ liệu trả về không phải mảng:", res.data);
      }
    } catch (err) {
      console.error("Lỗi khi lấy danh sách Student:", err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim() || !age) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/Student/${id}`, {
          id,
          name,
          age: parseInt(age),
        });
      } else {
        const res = await axios.post("http://localhost:5000/api/Student", {
          name,
          age: parseInt(age),
        });
        setId(res.data.id); // lấy ID từ phản hồi nếu cần
      }

      clearForm();
      getAllStudents();
    } catch (err) {
      console.error("Lỗi khi lưu Student:", err);
    }
  }

  function handleEdit(s) {
    setId(s.id);
    setName(s.name);
    setAge(s.age);
    setIsEditing(true);
  }

  async function handleDelete(studentId) {
    if (!confirm("Bạn có chắc muốn xóa bản ghi này?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/Student/${studentId}`);
      alert("Xóa bản ghi thành công!");
      getAllStudents();
    } catch (err) {
      console.error("Lỗi khi xóa:", err);
      alert("Lỗi khi xóa bản ghi: " + err.message);
    }
  }

  function clearForm() {
    setId("");
    setName("");
    setAge("");
    setIsEditing(false);
  }

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Danh sách Student</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-6">
        <input
          type="text"
          className="border p-2 rounded bg-gray-100"
          placeholder="Student ID"
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
          type="number"
          className="border p-2 rounded"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <div className="flex gap-4">
          <button
            type="submit"
            className={`${
              isEditing ? "bg-yellow-500" : "bg-green-600"
            } text-white px-4 py-2 rounded`}
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
            <th className="border px-4 py-2">Age</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id} className="text-center">
              <td className="border px-4 py-2">{s.id}</td>
              <td className="border px-4 py-2">{s.name}</td>
              <td className="border px-4 py-2">{s.age}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-yellow-400 px-3 py-1 rounded mr-2"
                  onClick={() => handleEdit(s)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(s.id)}
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

export default Student;
