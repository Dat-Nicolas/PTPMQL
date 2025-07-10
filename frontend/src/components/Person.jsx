import axios from "axios";
import { useEffect, useState } from "react";

function Person() {
  const [personId, setPersonId] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [persons, setPersons] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getAllPersons();
  }, []);

  async function getAllPersons() {
    try {
      const res = await axios.get("http://localhost:5000/api/Person");
      setPersons(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách Person:", err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!fullName.trim() || !address.trim()) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/Person/${personId}`, {
          personId,
          fullName,
          address,
        });
      } else {
        const res = await axios.post("http://localhost:5000/api/Person", {
          personId, 
          fullName,
          address,
        });
        setPersonId(res.data.personId); // lấy PersonId từ phản hồi
      }
      clearForm();
      getAllPersons();
    } catch (err) {
      console.error("Lỗi khi lưu Person:", err);
    }
  }

  function handleEdit(p) {
    setPersonId(p.personId);
    setFullName(p.fullName);
    setAddress(p.address);
    setIsEditing(true);
  }

  async function handleDelete(id) {
  if (!confirm("Bạn có chắc muốn xóa bản ghi này?")) return;

  try {
    await axios.delete(`http://localhost:5000/api/Person/${id}`);
    alert("Xóa bản ghi thành công!");
    getAllPersons();
  } catch (err) {
    console.error("Lỗi khi xóa:", err);
    alert("Lỗi khi xóa bản ghi: " + err.message);
  }
}

  function clearForm() {
    setPersonId("");
    setFullName("");
    setAddress("");
    setIsEditing(false);
  }

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Danh sách Person</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-6">
        <input
          type="text"
          className="border p-2 rounded bg-gray-100"
          placeholder="PersonID"
          value={personId}
          readOnly
        />
        <input
          type="text"
          className="border p-2 rounded"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="text"
          className="border p-2 rounded"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
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
            <th className="border px-4 py-2">Person ID</th>
            <th className="border px-4 py-2">Full Name</th>
            <th className="border px-4 py-2">Address</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((p) => (
            <tr key={p.personId} className="text-center">
              <td className="border px-4 py-2 font-semibold">{p.personId}</td>
              <td className="border px-4 py-2">{p.fullName}</td>
              <td className="border px-4 py-2">{p.address}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-yellow-400 px-3 py-1 rounded mr-2"
                  onClick={() => handleEdit(p)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(p.personId)}
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

export default Person;
