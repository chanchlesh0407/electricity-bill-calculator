import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function Chart({ data }) {
  return (
    <div className="w-full h-full">

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>

          {/* GRID */}
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          {/* X AXIS */}
          <XAxis
            dataKey="month"
            tick={{ fill: "#6b7280", fontSize: 12 }}
          />

          {/* Y AXIS */}
          <YAxis
            tick={{ fill: "#6b7280", fontSize: 12 }}
          />

          {/* TOOLTIP */}
          <Tooltip
            contentStyle={{
              borderRadius: "10px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />

          {/* LINE */}
          <Line
            type="monotone"
            dataKey="total_amount"
            stroke="#6366f1"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}