import axios from "axios";
import { useEffect, useState } from "react";

function Daily() {
  const [dailyId, setDailyId] = useState("");
  const [tenDaily, setTenDaily] = useState("");
  const [diaChi, setDiaChi] = useState("");
  const [nguoiDaiDien, setNguoiDaiDien] = useState("");
  const [dienThoai, setDienThoai] = useState("");
  const [maHTPP, setMaHTPP] = useState("");

  const [dailys, setDailys] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    getAllDailys();
  }, []);

  async function getAllDailys() {
    try {
      const res = await axios.get("http://localhost:5000/api/Daily");
      setDailys(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách Daily:", err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!tenDaily.trim() || !diaChi.trim()) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/Daily/${editingId}`, {
          id: editingId,
          maDaily: dailyId,
          tenDaily,
          diaChi,
          nguoiDaiDien,
          dienThoai,
          maHTPP,
        });
        alert("Cập nhật thành công!");
      } else {
        const res = await axios.post("http://localhost:5000/api/Daily", {
          tenDaily,
          diaChi,
          nguoiDaiDien,
          dienThoai,
          maHTPP,
        });
        alert("Tạo thành công!");
        setDailyId(res.data.maDaily);
      }

      clearForm();
      getAllDailys();
    } catch (err) {
      console.error("Lỗi khi lưu Daily:", err);
      alert("Lỗi khi lưu dữ liệu");
    }
  }

  function handleEdit(p) {
    setEditingId(p.id);
    setDailyId(p.maDaily);
    setTenDaily(p.tenDaily);
    setDiaChi(p.diaChi);
    setNguoiDaiDien(p.nguoiDaiDien);
    setDienThoai(p.dienThoai);
    setMaHTPP(p.maHTPP);
    setIsEditing(true);
  }

  async function handleDelete(id) {
    if (!confirm("Bạn có chắc muốn xóa bản ghi này?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/Daily/${id}`);
      alert("Xóa bản ghi thành công!");
      getAllDailys();
    } catch (err) {
      console.error("Lỗi khi xóa:", err);
      alert("Lỗi khi xóa bản ghi");
    }
  }

  function clearForm() {
    setDailyId("");
    setTenDaily("");
    setDiaChi("");
    setNguoiDaiDien("");
    setDienThoai("");
    setMaHTPP("");
    setIsEditing(false);
    setEditingId(null);
  }

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Danh sách Đại lý</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2">
        <input
          type="text"
          placeholder="Mã Đại Lý "
          value={dailyId}
          readOnly
          className="border p-2 rounded bg-gray-100"
        />
        <input
          type="text"
          placeholder="Tên Đại Lý"
          value={tenDaily}
          onChange={(e) => setTenDaily(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Địa chỉ"
          value={diaChi}
          onChange={(e) => setDiaChi(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Người đại diện"
          value={nguoiDaiDien}
          onChange={(e) => setNguoiDaiDien(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Điện thoại"
          value={dienThoai}
          onChange={(e) => setDienThoai(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Mã Hệ thống phân phối"
          value={maHTPP}
          onChange={(e) => setMaHTPP(e.target.value)}
          className="border p-2 rounded"
        />

        <div className="col-span-2 flex gap-4 justify-center mt-4">
          <button
            type="submit"
            className={`${
              isEditing ? "bg-yellow-500" : "bg-green-600"
            } text-white px-6 py-2 rounded font-semibold`}
          >
            {isEditing ? "Cập nhật" : "Tạo mới"}
          </button>
          <button
            type="button"
            onClick={clearForm}
            className="bg-gray-500 text-white px-6 py-2 rounded font-semibold"
          >
            Clear
          </button>
        </div>
      </form>

      <table className="table-auto w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2">Mã DL</th>
            <th className="border px-4 py-2">Tên Đại Lý</th>
            <th className="border px-4 py-2">Địa chỉ</th>
            <th className="border px-4 py-2">Người đại diện</th>
            <th className="border px-4 py-2">Điện thoại</th>
            <th className="border px-4 py-2">Mã HTPP</th>
            <th className="border px-4 py-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {dailys.map((p) => (
            <tr key={p.id} className="text-center">
              <td className="border px-4 py-2">{p.maDaily}</td>
              <td className="border px-4 py-2">{p.tenDaily}</td>
              <td className="border px-4 py-2">{p.diaChi}</td>
              <td className="border px-4 py-2">{p.nguoiDaiDien}</td>
              <td className="border px-4 py-2">{p.dienThoai}</td>
              <td className="border px-4 py-2">{p.maHTPP}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-yellow-400 px-3 py-1 rounded mr-2"
                  onClick={() => handleEdit(p)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(p.id)}
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

export default Daily;
