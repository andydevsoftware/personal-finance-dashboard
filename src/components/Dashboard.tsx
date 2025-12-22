"use client";

import { useState, useEffect } from "react";
import MetricCard from "./MetricCard";
import CategoryChart from "./Category.Chart";
import MonthlyTrend from "./MonthlyTrend";
import IncomeVsExpenses from "./IncomeVsExpenses";
import SavingsGoal from "./SavingsGoal";
import RecurringExpenses from "./Recurringexpenses";
import AlertsPanel from "./AlertsPanel";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";

import {
  transactions as initialTransactions,
  recurringExpenses as initialRecurringExpenses,
  alerts,
  type Transaction,
  type RecurringExpense,
} from "../data/mockData";

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [recurringExpenses, setRecurringExpenses] = useState<
    RecurringExpense[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const [filterType, setFilterType] = useState<"all" | "income" | "expense">(
    "all"
  );
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterDateRange, setFilterDateRange] = useState<
    "all" | "month" | "quarter" | "year"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    try {
      const storedTransactions = localStorage.getItem("transactions");
      const storedRecurring = localStorage.getItem("recurringExpenses");

      setTransactions(
        storedTransactions
          ? JSON.parse(storedTransactions)
          : initialTransactions
      );

      setRecurringExpenses(
        storedRecurring ? JSON.parse(storedRecurring) : initialRecurringExpenses
      );
    } catch (error) {
      console.error("Error cargando datos:", error);
      setTransactions(initialTransactions);
      setRecurringExpenses(initialRecurringExpenses);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }
  }, [transactions, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(
        "recurringExpenses",
        JSON.stringify(recurringExpenses)
      );
    }
  }, [recurringExpenses, isLoading]);

  const handleAddTransaction = (newTransaction: Omit<Transaction, "id">) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: Date.now().toString(),
    };
    setTransactions([...transactions, transaction]);
  };

  const handleEditTransaction = (
    id: string,
    updatedTransaction: Omit<Transaction, "id">
  ) => {
    setTransactions(
      transactions.map((t) => (t.id === id ? { ...updatedTransaction, id } : t))
    );
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const handleUpdateRecurringExpense = (index: number, amount: number) => {
    const updated = [...recurringExpenses];
    updated[index] = { ...updated[index], amount };
    setRecurringExpenses(updated);
  };

  const handleDeleteRecurringExpense = (index: number) => {
    setRecurringExpenses(recurringExpenses.filter((_, i) => i !== index));
  };

  const handleAddRecurringExpense = (expense: RecurringExpense) => {
    setRecurringExpenses([...recurringExpenses, expense]);
  };

  const handleResetData = () => {
    if (
      confirm(
        "¿Estás seguro de que quieres eliminar TODAS las transacciones y gastos recurrentes? Esto te dejará con un dashboard completamente vacío."
      )
    ) {
      setTransactions([]);
      setRecurringExpenses([]);
      localStorage.removeItem("transactions");
      localStorage.removeItem("recurringExpenses");
    }
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(
      { transactions, recurringExpenses },
      null,
      2
    );
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `finanzas-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getFilteredTransactions = () => {
    let filtered = [...transactions];

    if (filterType !== "all") {
      filtered = filtered.filter((t) => t.type === filterType);
    }

    if (filterCategory !== "all") {
      filtered = filtered.filter((t) => t.category === filterCategory);
    }

    if (filterDateRange !== "all") {
      const now = new Date();
      const cutoffDate = new Date();

      switch (filterDateRange) {
        case "month":
          cutoffDate.setMonth(now.getMonth() - 1);
          break;
        case "quarter":
          cutoffDate.setMonth(now.getMonth() - 3);
          break;
        case "year":
          cutoffDate.setFullYear(now.getFullYear() - 1);
          break;
      }

      filtered = filtered.filter((t) => new Date(t.date) >= cutoffDate);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.description.toLowerCase().includes(query) ||
          t.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  const filteredTransactions = getFilteredTransactions();

  const getUniqueCategories = () => {
    const categories = new Set(transactions.map((t) => t.category));
    return Array.from(categories).sort();
  };

  const hasActiveFilters =
    filterType !== "all" ||
    filterCategory !== "all" ||
    filterDateRange !== "all" ||
    searchQuery.trim() !== "";

  const clearFilters = () => {
    setFilterType("all");
    setFilterCategory("all");
    setFilterDateRange("all");
    setSearchQuery("");
  };

  const getDateRange = () => {
    if (filteredTransactions.length === 0) return "Sin transacciones";

    const dates = filteredTransactions.map((t) => new Date(t.date));
    const minDate = new Date(Math.min(...dates.map((d) => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())));

    const formatMonth = (date: Date) => {
      return date.toLocaleDateString("es-PE", {
        month: "long",
        year: "numeric",
      });
    };

    if (
      minDate.getMonth() === maxDate.getMonth() &&
      minDate.getFullYear() === maxDate.getFullYear()
    ) {
      return formatMonth(minDate);
    }

    return `${formatMonth(minDate)} - ${formatMonth(maxDate)}`;
  };

  const totalRecurringExpenses = recurringExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const totalIncome = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses =
    filteredTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0) + totalRecurringExpenses;

  const savings = totalIncome - totalExpenses;
  const expensePercentage =
    totalIncome > 0 ? Math.round((totalExpenses / totalIncome) * 100) : 0;
  const savingsPercentage =
    totalIncome > 0 ? Math.round((savings / totalIncome) * 100) : 0;

  const categoryData = (() => {
    const colors: { [key: string]: string } = {
      Alimentación: "#FF6B6B",
      Transporte: "#4ECDC4",
      Vivienda: "#45B7D1",
      Ocio: "#FFA07A",
      Educación: "#98D8C8",
      Servicios: "#F7DC6F",
      Salud: "#BB8FCE",
      Ropa: "#85C1E2",
      Otros: "#AAB7B8",
    };

    const icons: { [key: string]: string } = {
      Alimentación: "🍔",
      Transporte: "🚕",
      Vivienda: "🏠",
      Ocio: "🎮",
      Educación: "📚",
      Servicios: "💡",
      Salud: "🏥",
      Ropa: "👕",
      Otros: "📦",
    };

    const categoryMap: { [key: string]: number } = {};

    filteredTransactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
      });

    if (recurringExpenses.length > 0) {
      const totalRecurring = recurringExpenses.reduce(
        (sum, e) => sum + e.amount,
        0
      );
      categoryMap["Servicios"] =
        (categoryMap["Servicios"] || 0) + totalRecurring;
    }

    return Object.entries(categoryMap).map(([name, value]) => ({
      name,
      value,
      color: colors[name] || "#AAB7B8",
      icon: icons[name] || "📦",
    }));
  })();

  const monthlyData = (() => {
    if (filteredTransactions.length === 0 && recurringExpenses.length === 0)
      return [];

    const monthMap: {
      [key: string]: {
        month: string;
        income: number;
        expenses: number;
        savings: number;
      };
    } = {};

    filteredTransactions.forEach((t) => {
      const date = new Date(t.date);
      const key = date.toLocaleDateString("es-PE", {
        month: "long",
        year: "numeric",
      });

      if (!monthMap[key]) {
        monthMap[key] = { month: key, income: 0, expenses: 0, savings: 0 };
      }

      if (t.type === "income") {
        monthMap[key].income += t.amount;
      } else {
        monthMap[key].expenses += t.amount;
      }
    });

    Object.values(monthMap).forEach((monthData) => {
      monthData.expenses += totalRecurringExpenses;
      monthData.savings = monthData.income - monthData.expenses;
    });

    return Object.values(monthMap);
  })();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">📊</div>
          <p className="text-xl font-semibold text-gray-700">
            Cargando dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100 via-purple-50 to-pink-100">
      <div className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                📊 Personal Finance Dashboard
              </h1>
              <p className="text-lg opacity-90">
                Visualiza, analiza y controla tus finanzas personales 📈
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm flex-wrap">
                <span className="bg-white/20 px-3 py-1 rounded-full capitalize">
                  {getDateRange()}
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full">
                  {filteredTransactions.length} de {transactions.length}{" "}
                  transacciones
                </span>
                {recurringExpenses.length > 0 && (
                  <span className="bg-purple-400/30 px-3 py-1 rounded-full">
                    🔄 {recurringExpenses.length} gastos recurrentes
                  </span>
                )}
                {hasActiveFilters && (
                  <span className="bg-yellow-400/30 px-3 py-1 rounded-full">
                    🔎 Filtros activos
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              >
                🔍 Filtros
              </button>
              <button
                onClick={handleExportData}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              >
                📥 Exportar
              </button>
              <button
                onClick={handleResetData}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              >
                🗑️ Limpiar Todo
              </button>
            </div>
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                🔍 Filtros Avanzados
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Limpiar filtros
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buscar
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Descripción o categoría..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo
                </label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                >
                  <option value="all">Todos</option>
                  <option value="income">Ingresos</option>
                  <option value="expense">Gastos</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoría
                </label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                >
                  <option value="all">Todas</option>
                  {getUniqueCategories().map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Período
                </label>
                <select
                  value={filterDateRange}
                  onChange={(e) => setFilterDateRange(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                >
                  <option value="all">Todo el tiempo</option>
                  <option value="month">Último mes</option>
                  <option value="quarter">Últimos 3 meses</option>
                  <option value="year">Último año</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="💰 Ingresos Totales"
            value={`S/ ${totalIncome.toLocaleString()}`}
            subtitle={hasActiveFilters ? "Filtrado" : "Total acumulado"}
            icon="💵"
            trend="up"
            trendValue="+12%"
            color="bg-gradient-to-br from-green-50 to-emerald-100"
          />
          <MetricCard
            title="💸 Gastos Totales"
            value={`S/ ${totalExpenses.toLocaleString()}`}
            subtitle={
              recurringExpenses.length > 0
                ? `Incluye S/ ${totalRecurringExpenses.toLocaleString()} recurrentes`
                : hasActiveFilters
                ? "Filtrado"
                : "Total acumulado"
            }
            icon="💳"
            trend="down"
            trendValue="-5%"
            color="bg-gradient-to-br from-red-50 to-pink-100"
          />
          <MetricCard
            title="📈 Ahorro Total"
            value={`S/ ${savings.toLocaleString()}`}
            subtitle={`${savingsPercentage}% de ingresos`}
            icon="💎"
            trend={savings > 0 ? "up" : "down"}
            trendValue={savings > 0 ? "+18%" : "-8%"}
            color="bg-gradient-to-br from-blue-50 to-cyan-100"
          />
          <MetricCard
            title="📉 Gasto vs Ingreso"
            value={`${expensePercentage}%`}
            subtitle={`Has gastado el ${expensePercentage}% de tus ingresos`}
            icon="📊"
            trend={expensePercentage > 80 ? "down" : "neutral"}
            trendValue={expensePercentage > 80 ? "Alto" : "Normal"}
            color="bg-gradient-to-br from-purple-50 to-violet-100"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CategoryChart data={categoryData} />
          <MonthlyTrend data={monthlyData} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <IncomeVsExpenses data={monthlyData} />
          <SavingsGoal income={totalIncome} expenses={totalExpenses} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecurringExpenses
            expenses={recurringExpenses}
            onUpdateExpense={handleUpdateRecurringExpense}
            onDeleteExpense={handleDeleteRecurringExpense}
            onAddExpense={handleAddRecurringExpense}
          />
          <AlertsPanel alerts={alerts as any} />
        </div>

        <TransactionList
          transactions={filteredTransactions}
          onDeleteTransaction={handleDeleteTransaction}
          onEditTransaction={handleEditTransaction}
        />

        <div className="mt-12 text-center pb-8">
          <div className="inline-block bg-white rounded-2xl px-8 py-4 shadow-sm border border-gray-200">
            <p className="text-sm text-gray-600">
              Dashboard creado por Andy usando{" "}
              <span className="font-semibold text-indigo-600">Next.js</span>,
              <span className="font-semibold text-cyan-600"> Tailwind</span> y
              <span className="font-semibold text-purple-600"> Recharts</span>
            </p>
          </div>
        </div>
      </div>

      <TransactionForm onAddTransaction={handleAddTransaction} />
    </div>
  );
}
