"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Product } from "@prisma/client";

export default function ProductCharts({products}: {products: Product[]}){
    return(
        <BarChart width={500} height={300} data={products}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Tooltip />
            <Legend />
            <Bar dataKey="stock" fill="#8884d8" />
        </BarChart>
    );
}