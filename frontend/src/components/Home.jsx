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

  useEffect(() => {
    fetch("http://localhost:5000/api/Dashboard/counts")
      .then((res) => res.json())
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
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full text-center">
        <h1 className="text-4xl font-extrabold text-purple-700 mb-4">
          📊 Thống kê dữ liệu bảng
        </h1>
        <div className="mt-8">
          <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } }}} />
        </div>
      </div>
    </div>
  );
}
