"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface IncomeVsExpensesProps {
  data: Array<{
    month: string; // Ej: "Marzo", "Marzo 2024"
    income: number;
    expenses: number;
    savings: number;
  }>;
}

export default function IncomeVsExpenses({ data }: IncomeVsExpensesProps) {
  /**
   *  Se verifica si hay datos reales
   */
  const hasRealData = data.some((d) => d.income > 0 || d.expenses > 0);

  /**
   *  Si no hay datos → mensaje neutro
   */
  if (!hasRealData) {
    return (
      <div className="bg-linear-to-br from-teal-50 to-cyan-50 rounded-2xl p-12 shadow-sm border border-white/50 text-center">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Aún no hay datos financieros
        </h3>
        <p className="text-gray-600">
          Agrega transacciones para comenzar a analizar tus ingresos y gastos
        </p>
      </div>
    );
  }

  /**
   * Se filtran solo meses con datos
   */
  const chartData = data.filter((d) => d.income > 0 || d.expenses > 0);

  /**
   * Se identifica meses con déficit (gastos > ingresos)
   */
  const deficitMonths = chartData.filter((d) => d.expenses > d.income);

  const getDeficitMessage = () => {
    if (deficitMonths.length === 0) {
      return "✓ Tus ingresos han cubierto todos tus gastos";
    }

    if (deficitMonths.length <= 3) {
      return `⚠️ En ${deficitMonths
        .map((m) => m.month)
        .join(", ")} tus gastos superaron a tus ingresos`;
    }

    return `⚠️ En ${deficitMonths
      .slice(0, 2)
      .map((m) => m.month)
      .join(", ")} y ${
      deficitMonths.length - 2
    } meses más tus gastos superaron a tus ingresos`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const income =
        payload.find((p: any) => p.dataKey === "income")?.value || 0;
      const expenses =
        payload.find((p: any) => p.dataKey === "expenses")?.value || 0;
      const balance = income - expenses;

      return (
        <div className="bg-white px-4 py-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          <p className="text-sm text-green-600">
            Ingresos: S/ {income.toLocaleString()}
          </p>
          <p className="text-sm text-red-600">
            Gastos: S/ {expenses.toLocaleString()}
          </p>
          <p
            className={`text-sm font-semibold mt-1 pt-1 border-t ${
              balance >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            Balance: S/ {balance.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  /**
   * Se renderiza el componente principal
   */
  return (
    <div className="bg-linear-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 shadow-sm border border-white/50">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          💵 Ingresos vs Gastos
        </h3>

        <p
          className={`text-sm font-medium ${
            deficitMonths.length === 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {getDeficitMessage()}
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData.slice(-6)}>
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
          <Bar
            dataKey="income"
            fill="#4ECDC4"
            name="Ingresos"
            radius={[8, 8, 0, 0]}
          />
          <Bar
            dataKey="expenses"
            fill="#FF6B6B"
            name="Gastos"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
