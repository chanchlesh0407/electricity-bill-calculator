import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { getAnalytics } from "../services/api";

export default function Analytics() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH FROM BACKEND
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    getAnalytics(token)
      .then((res) => {
        setData(res || []);
      })
      .catch(() => {
        console.error("Error fetching analytics");
      })
      .finally(() => setLoading(false));
  }, []);

  // 🔥 CALCULATE STATS
  const values = data.map((d) => Number(d.total_amount || 0));

  const avg =
    values.length > 0
      ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(0)
      : 0;

  const max = values.length > 0 ? Math.max(...values) : 0;
  const min = values.length > 0 ? Math.min(...values) : 0;

  return (
    <div className="h-full flex flex-col">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Energy Analytics
        </h2>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          Last Usage
        </span>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-xl text-center shadow-sm">
          <p className="text-gray-500 text-sm">Average</p>
          <h3 className="font-semibold text-lg text-indigo-600">
            ₹{avg}
          </h3>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl text-center shadow-sm">
          <p className="text-gray-500 text-sm">Maximum</p>
          <h3 className="font-semibold text-lg text-red-500">
            ₹{max}
          </h3>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl text-center shadow-sm">
          <p className="text-gray-500 text-sm">Minimum</p>
          <h3 className="font-semibold text-lg text-green-500">
            ₹{min}
          </h3>
        </div>
      </div>

      {/* GRAPH */}
      <div className="flex justify-center flex-1">

        <div className="w-full max-w-5xl aspect-[2/1] bg-white rounded-2xl shadow-sm p-4">

          {loading ? (
            <div className="h-full flex items-center justify-center text-gray-400">
              Loading analytics...
            </div>
          ) : data.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-400">
              No data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
              >

                {/* GRADIENT */}
                <defs>
                  <linearGradient id="colorBill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>

                {/* GRID */}
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                  vertical={false}
                />

                {/* X AXIS */}
                <XAxis
                  dataKey="month"
                  stroke="#9ca3af"
                  tickLine={false}
                  axisLine={false}
                  padding={{ left: 20, right: 20 }}
                />

                {/* Y AXIS */}
                <YAxis
                  stroke="#9ca3af"
                  tickLine={false}
                  axisLine={false}
                  domain={["dataMin - 200", "dataMax + 200"]}
                />

                {/* TOOLTIP */}
                <Tooltip
                  formatter={(value) => `₹ ${value}`}
                  contentStyle={{
                    background: "white",
                    borderRadius: "10px",
                    border: "none",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                />

                {/* LINE */}
                <Area
                  type="natural"
                  dataKey="total_amount" // 🔥 backend field
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  fill="url(#colorBill)"
                  dot={false}
                  activeDot={{ r: 5 }}
                  animationDuration={700}
                />

              </AreaChart>
            </ResponsiveContainer>
          )}

        </div>
      </div>
    </div>
  );
}