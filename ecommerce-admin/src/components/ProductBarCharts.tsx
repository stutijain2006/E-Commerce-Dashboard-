"use client";

import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Product } from "@prisma/client";

export default function ProductBarCharts({ products }: { products: Product[] }) {
  const chartData = useMemo(() => {
    return products.map((product) => ({
      name: product.name.length > 15 ? product.name.substring(0, 15) + "..." : product.name,
      stock: product.stock,
    }));
  }, [products]);

  if (products.length === 0) {
    return (
      <div className="w-full h-[50vh] flex items-center justify-center border border-slate-200 rounded-lg bg-slate-50">
        <p className="text-slate-500">No products available for chart</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[50vh] min-h-[30vh]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={100}
            interval={0}
            tick={{ fontSize: 12 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="stock" fill="#4f46e5" name="Stock" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}