import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Home() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const user = JSON.parse(localStorage.getItem("user"));
  const name = user?.userName || "người dùng";
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/Dashboard/counts", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 👈 Thêm dòng này
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Không có quyền truy cập hoặc token sai!");
        return res.json();
      })
      .then((data) => {
        const labels = Object.keys(data);
        const counts = Object.values(data);

        setChartData({
          labels,
          datasets: [
            {
              label: "Số lượng bản ghi",
              data: counts,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((err) => {
        console.error("Lỗi lấy dữ liệu thống kê:", err.message);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center px-4">
      <p className="text-xl font-medium text-gray-700 mb-4">
        👋 Xin chào, <span className="font-bold text-purple-600">{name} </span> đến với trang chủ của PTPMQL APP
      </p>
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full text-center">
        <h1 className="text-4xl font-extrabold text-purple-700 mb-4">
          📊 Thống kê dữ liệu bảng
        </h1>
        <div className="mt-8">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: { legend: { position: "bottom" } },
            }}
          />
        </div>
      </div>
    </div>
  );
}
