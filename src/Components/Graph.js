import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";


export default function Graph({tableData}) {
  return (
    <AreaChart
      width={500}
      height={400}
      data={tableData}
      margin={{
        top: 20,
        right: 30,
        left: 0,
        bottom: 0
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis dataKey="duration"/>
      <Tooltip />
      <Area type="monotone" dataKey="duration" stroke="#8884d8" fill="blue" />
    </AreaChart>
  );
}
