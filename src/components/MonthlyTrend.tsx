"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface MonthlyTrendProps {
  data: Array<{
    month: string;
    income: number;
    expenses: number;
    savings: number;
  }>;
}

export default function MonthlyTrend({ data }: MonthlyTrendProps) {
  // Verificar si hay datos
  if (!data || data.length === 0) {
    return (
      <div className="bg-linear-to-br from-orange-50 to-amber-50 rounded-2xl p-12 shadow-sm border border-white/50 text-center">
        <div className="text-6xl mb-4">📈</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Sin datos históricos
        </h3>
        <p className="text-gray-600">
          Agrega transacciones para ver la tendencia mensual
        </p>
      </div>
    );
  }

  // Tomar los últimos 6 meses
  const recentData = data.slice(-6);

  // Calcular la tendencia
  const totalSavings = recentData.reduce((sum, d) => sum + d.savings, 0);
  const avgSavings = totalSavings / recentData.length;
  const lastMonthSavings = recentData[recentData.length - 1]?.savings || 0;
  const trend = lastMonthSavings > avgSavings ? "up" : "down";

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-4 py-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          <p className="text-sm text-green-600">
            Ingresos: S/ {payload[0]?.value.toLocaleString() || 0}
          </p>
          <p className="text-sm text-red-600">
            Gastos: S/ {payload[1]?.value.toLocaleString() || 0}
          </p>
          <p className="text-sm text-blue-600 font-semibold mt-1 pt-1 border-t">
            Ahorro: S/ {payload[2]?.value.toLocaleString() || 0}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-linear-to-br from-orange-50 to-amber-50 rounded-2xl p-6 shadow-sm border border-white/50">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          📈 Tendencia Mensual
        </h3>
        <p className="text-sm text-gray-600">
          {trend === "up" ? "📊" : "📉"} Ahorro promedio: S/{" "}
          {avgSavings.toLocaleString("es-PE", {
            maximumFractionDigits: 0,
          })}{" "}
          por mes
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={recentData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="month"
            tick={{ fill: "#666", fontSize: 12 }}
            axisLine={{ stroke: "#e0e0e0" }}
          />
          <YAxis
            tick={{ fill: "#666", fontSize: 12 }}
            axisLine={{ stroke: "#e0e0e0" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="circle" />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#4ECDC4"
            strokeWidth={3}
            dot={{ fill: "#4ECDC4", r: 5 }}
            name="Ingresos"
          />
          <Line
            type="monotone"
            dataKey="expenses"
            stroke="#FF6B6B"
            strokeWidth={3}
            dot={{ fill: "#FF6B6B", r: 5 }}
            name="Gastos"
          />
          <Line
            type="monotone"
            dataKey="savings"
            stroke="#45B7D1"
            strokeWidth={3}
            dot={{ fill: "#45B7D1", r: 5 }}
            name="Ahorro"
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-xs text-gray-600 mb-1">Ingreso Promedio</p>
          <p className="text-lg font-bold text-green-600">
            S/{" "}
            {(
              recentData.reduce((sum, d) => sum + d.income, 0) /
              recentData.length
            ).toLocaleString("es-PE", { maximumFractionDigits: 0 })}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-600 mb-1">Gasto Promedio</p>
          <p className="text-lg font-bold text-red-600">
            S/{" "}
            {(
              recentData.reduce((sum, d) => sum + d.expenses, 0) /
              recentData.length
            ).toLocaleString("es-PE", { maximumFractionDigits: 0 })}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-600 mb-1">Ahorro Promedio</p>
          <p className="text-lg font-bold text-blue-600">
            S/{" "}
            {avgSavings.toLocaleString("es-PE", { maximumFractionDigits: 0 })}
          </p>
        </div>
      </div>
    </div>
  );
}
