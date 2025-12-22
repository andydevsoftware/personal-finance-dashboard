"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface CategoryChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
    icon: string;
  }>;
}

export default function CategoryChart({ data }: CategoryChartProps) {
  // Se verifica si hay datos disponibles
  if (!data || data.length === 0) {
    return (
      <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-2xl p-12 shadow-sm border border-white/50 text-center">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Sin gastos registrados
        </h3>
        <p className="text-gray-600">
          Agrega gastos para ver el análisis por categorías
        </p>
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Se verifica que el total sea mayor a 0
  if (total === 0) {
    return (
      <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-2xl p-12 shadow-sm border border-white/50 text-center">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Sin gastos registrados
        </h3>
        <p className="text-gray-600">
          Agrega gastos para ver el análisis por categorías
        </p>
      </div>
    );
  }

  const topCategory = data.reduce((prev, current) =>
    prev.value > current.value ? prev : current
  );
  const topPercentage =
    total > 0 ? ((topCategory.value / total) * 100).toFixed(0) : "0";

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const percentage =
        total > 0 ? ((data.value / total) * 100).toFixed(1) : "0";
      return (
        <div className="bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{data.name}</p>
          <p className="text-sm text-gray-600">
            S/ {data.value.toLocaleString()} ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex flex-wrap gap-3 justify-center mt-6">
        {payload.map((entry: any, index: number) => {
          const percentage =
            total > 0 ? ((entry.payload.value / total) * 100).toFixed(0) : "0";
          return (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-700">
                {entry.payload.icon} {entry.value}
              </span>
              <span className="text-gray-500 font-medium">{percentage}%</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-2xl p-6 shadow-sm border border-white/50">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          💰 Gastos por Categoría
        </h3>
        <p className="text-sm text-gray-600">
          {topCategory.icon}{" "}
          <span className="font-semibold">{topCategory.name}</span> representa
          el {topPercentage}% de tus gastos
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-6 text-center">
        <p className="text-2xl font-bold text-gray-900">
          S/ {total.toLocaleString()}
        </p>
        <p className="text-sm text-gray-600">Total gastado este mes</p>
      </div>
    </div>
  );
}
