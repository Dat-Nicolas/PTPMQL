import axios from "axios";
import { useEffect, useState } from "react";

function Person() {
  const [personId, setPersonId] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    getAllPerson();
  }, []);

  async function getAllPerson() {
    try {
      const res = await axios.get("http://localhost:5000/api/Person");
      setPersons(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách người:", err);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!personId.trim() || !fullName.trim() || !address.trim()) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    try {
      // Nếu đã có personId trong danh sách thì gọi PUT để cập nhật
      const existing = persons.find((p) => p.personId === personId);

      if (existing) {
        await axios.put(`http://localhost:5000/api/Person/${personId}`, {
          personId,
          fullName,
          address,
        });
      } else {
        await axios.post("http://localhost:5000/api/Person", {
          personId,
          fullName,
          address,
        });
      }

      await getAllPerson();
      clearForm();
    } catch (err) {
      console.error("Lỗi khi xử lý:", err);
    }
  }

  function fillForm(p) {
    setPersonId(p.personId);
    setFullName(p.fullName);
    setAddress(p.address);
  }

  function clearForm() {
    setPersonId("");
    setFullName("");
    setAddress("");
  }

  async function deletePerson(id) {
    if (!window.confirm("Bạn có chắc muốn xoá không?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/Person/${id}`);
      await getAllPerson();
    } catch (err) {
      console.error("Lỗi khi xoá:", err);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-md mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">
        {persons.find((p) => p.personId === personId)
          ? "Cập nhật Person"
          : "Tạo mới Person"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Person ID"
          value={personId}
          onChange={(e) => setPersonId(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
        />
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
        />

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {persons.find((p) => p.personId === personId)
              ? "Cập nhật"
              : "Tạo mới"}
          </button>
          <button
            type="button"
            onClick={clearForm}
            className="flex-1 bg-gray-300 text-black py-2 rounded-md hover:bg-gray-400"
          >
            Xoá form
          </button>
        </div>
      </form>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-3">Danh sách Person</h2>
      <ul className="space-y-3">
        {persons.map((p) => (
          <li
            key={p.personId}
            className="flex justify-between items-center bg-gray-100 p-3 rounded-md"
          >
            <div>
              <p className="font-bold">{p.fullName}</p>
              <p>{p.address}</p>
              <p className="text-xs text-gray-500">ID: {p.personId}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => fillForm(p)}
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Sửa
              </button>
              <button
                onClick={() => deletePerson(p.personId)}
                className="text-red-500 hover:text-red-700 font-semibold"
              >
                Xoá
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Person;
