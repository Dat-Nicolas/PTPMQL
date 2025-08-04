import { useEffect, useState } from "react";
import {
  getGods,
  deleteGod,
  addGod,
  updateGod,
} from "../api/GodAPI";

export default function God() {
  const [Gods, setGods] = useState([]);
  const [form, setForm] = useState({ name: "", age: "" });
  const [isEdit, setIsEdit] = useState(false);

  const loadData = async () => {
    const res = await getGods();
    setGods(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Xóa God này?")) {
      await deleteGod(id);
      loadData();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateGod(form.name, { ...form, age: parseInt(form.age) });
      } else {
        await addGod({ ...form, age: parseInt(form.age) });
      }
      setForm({ name: "", age: "" });
      setIsEdit(false);
      loadData();
    } catch (err) {
      alert("Lỗi khi thêm/sửa dữ liệu!");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onEdit = (God) => {
    setForm(God);
    setIsEdit(true);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{isEdit ? "Sửa" : "Thêm"} God</h2>
      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Tên God"
          className="border p-2 w-full"
          disabled={isEdit} // không cho sửa name khi update
          required
        />
        <input
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
          placeholder="Tuổi"
          className="border p-2 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isEdit ? "Cập nhật" : "Thêm mới"}
        </button>
        {isEdit && (
          <button
            type="button"
            onClick={() => {
              setForm({ name: "", age: "" });
              setIsEdit(false);
            }}
            className="ml-2 bg-gray-400 text-white px-4 py-2 rounded"
          >
            Hủy
          </button>
        )}
      </form>

      <h2 className="text-xl font-bold mb-4">Danh sách God</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Tên</th>
            <th className="px-4 py-2">Tuổi</th>
            <th className="px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {Gods.map((God) => (
            <tr key={God.name}>
              <td className="border px-4 py-2">{God.name}</td>
              <td className="border px-4 py-2">{God.age}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => onEdit(God)}
                  className="bg-yellow-400 px-2 py-1 rounded"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(God.name)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
