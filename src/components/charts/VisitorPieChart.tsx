import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface PlatformVisitorData {
  platform: string;
  count: number;
}

interface VisitorPieChartProps {
  data: PlatformVisitorData[];
}

// Define more distinct colors for better visual separation
const COLORS = [
  "#E4002B",
  "#007bff",
  "#28a745",
  "#ffc107",
  "#6f42c1",
  "#dc3545",
  "#17a2b8",
  "#fd7e14",
];

const VisitorPieChart: React.FC<VisitorPieChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="count"
          label={({ platform, percent }) =>
            `${platform}: ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#333",
            border: "none",
            borderRadius: "4px",
            color: "#fff",
          }}
          labelStyle={{ color: "#fff" }}
          itemStyle={{ color: "#fff" }}
        />
        <Legend
          align="center"
          verticalAlign="bottom"
          layout="horizontal"
          iconType="circle"
          wrapperStyle={{ paddingTop: "20px" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default VisitorPieChart;
