

import axios from "axios";
import { useEffect, useState } from "react";

function HeThongPhanPhoi() {
  const [maHTPP, setMaHTPP] = useState("");
  const [tenHTPP, setTenHTPP] = useState("");
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getAll();
  }, []);

  async function getAll() {
    try {
      const res = await axios.get("http://localhost:5000/api/HeThongPhanPhoi");
      setItems(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách:", err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!tenHTPP.trim()) {
      alert("Vui lòng nhập tên hệ thống phân phối.");
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/HeThongPhanPhoi/${maHTPP}`, {
          maHTPP,
          tenHTPP
        });
      } else {
        const res = await axios.post("http://localhost:5000/api/HeThongPhanPhoi", {
          maHTPP,
          tenHTPP
        });
        setMaHTPP(res.data.maHTPP); // nếu backend trả về
      }
      clearForm();
      getAll();
    } catch (err) {
      console.error("Lỗi khi lưu:", err);
    }
  }

  function handleEdit(p) {
    setMaHTPP(p.maHTPP);
    setTenHTPP(p.tenHTPP);
    setIsEditing(true);
  }

  async function handleDelete(id) {
    if (!confirm("Bạn có chắc muốn xóa không?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/HeThongPhanPhoi/${id}`);
      alert("Xóa thành công!");
      getAll();
    } catch (err) {
      console.error("Lỗi khi xóa:", err);
      alert("Lỗi xóa: " + err.message);
    }
  }

  function clearForm() {
    setMaHTPP("");
    setTenHTPP("");
    setIsEditing(false);
  }

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Danh sách Hệ Thống Phân Phối</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-6">
        <input
          type="text"
          className="border p-2 rounded bg-gray-100"
          placeholder="Mã HTPP"
          value={maHTPP}
          readOnly
        />
        <input
          type="text"
          className="border p-2 rounded"
          placeholder="Tên HTPP"
          value={tenHTPP}
          onChange={(e) => setTenHTPP(e.target.value)}
        />
        <div className="flex gap-4">
          <button
            type="submit"
            className={`${
              isEditing ? "bg-yellow-500" : "bg-green-600"
            } text-white px-4 py-2 rounded`}
          >
            {isEditing ? "Cập nhật" : "Tạo mới"}
          </button>
          <button
            type="button"
            onClick={clearForm}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Xóa form
          </button>
        </div>
      </form>

      <table className="table-auto w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2">Mã HTPP</th>
            <th className="border px-4 py-2">Tên HTPP</th>
            <th className="border px-4 py-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.maHTPP} className="text-center">
              <td className="border px-4 py-2">{item.maHTPP}</td>
              <td className="border px-4 py-2">{item.tenHTPP}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-yellow-400 px-3 py-1 rounded mr-2"
                  onClick={() => handleEdit(item)}
                >
                  Sửa
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(item.maHTPP)}
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

export default HeThongPhanPhoi;
