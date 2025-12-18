"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Product } from "@prisma/client";

export default function ProductBarCharts({ products }: { products: Product[] }) {
  return (
    <div className="w-[60vw] h-[50vh]">
      <ResponsiveContainer height="100%">
        <BarChart data={products}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid stroke="#e2e8f0" strokeDasharray="5 5" />
          <Tooltip />
          <Legend />
          <Bar dataKey="stock" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}