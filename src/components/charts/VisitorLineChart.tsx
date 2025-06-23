import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DailyVisitorData {
  date: string;
  count: number;
}

interface VisitorLineChartProps {
  data: DailyVisitorData[];
}

const VisitorLineChart: React.FC<VisitorLineChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis
          dataKey="date"
          stroke="#888"
          angle={-15}
          textAnchor="end"
          height={40}
        />{" "}
        {/* Rotated labels for better readability */}
        <YAxis stroke="#888" />
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
        <Line
          type="monotone"
          dataKey="count"
          stroke="#E4002B"
          activeDot={{ r: 8 }}
          strokeWidth={2}
          name="Visitors"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default VisitorLineChart;
