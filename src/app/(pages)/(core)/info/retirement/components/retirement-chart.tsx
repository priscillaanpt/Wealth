"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  {
    name: "Dana Sekarang",
    value: 404_250_000,
    fill: "#00D0B5",
  },
  {
    name: "Target Dana",
    value: 782_436_000.06,
    fill: "#4458FE",
  },
];

// Format number to IDR with comma and decimals
const formatToIDR = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  }).format(value);

export default function RetirementChart() {
  return (
    <div className="rounded-xl bg-white p-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            tick={{
              fill: "#1E1E2D",
              fontSize: 14,
              fontFamily: "Rubik",
            }}
            interval={0}
          />
          <YAxis
            tickFormatter={formatToIDR}
            tick={{ fill: "#B1B1B8", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: "transparent" }}
            formatter={(value) => formatToIDR(Number(value))}
            labelFormatter={() => ""}
            contentStyle={{
              backgroundColor: "#30314C",
              borderRadius: "6px",
              border: "none",
              color: "#fff",
              fontFamily: "Rubik",
              fontSize: 14,
            }}
          />
          <Bar dataKey="value">
            <LabelList
              dataKey="value"
              position="top"
              formatter={(val: number) => formatToIDR(val)}
              fill="#fff"
              fontSize={14}
              fontWeight="bold"
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
