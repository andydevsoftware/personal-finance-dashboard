"use client";

import { useState } from "react";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: "income" | "expense";
}

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
  onEditTransaction: (id: string, transaction: Omit<Transaction, "id">) => void;
}

export default function TransactionList({
  transactions,
  onDeleteTransaction,
  onEditTransaction,
}: TransactionListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Omit<Transaction, "id">>({
    description: "",
    amount: 0,
    category: "",
    date: "",
    type: "expense",
  });

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      Alimentación: "🍔",
      Transporte: "🚕",
      Vivienda: "🏠",
      Ocio: "🎮",
      Educación: "📚",
      Servicios: "💡",
      Salud: "🏥",
      Ropa: "👕",
      Salario: "💼",
      Freelance: "💻",
      Inversiones: "📈",
      Extra: "💰",
      Otros: "📦",
    };
    return icons[category] || "📦";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-PE", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleStartEdit = (transaction: Transaction) => {
    setEditingId(transaction.id);
    setEditForm({
      description: transaction.description,
      amount: transaction.amount,
      category: transaction.category,
      date: transaction.date,
      type: transaction.type,
    });
  };

  const handleSaveEdit = (id: string) => {
    // Validar que los campos estén completos
    if (
      !editForm.description ||
      !editForm.amount ||
      !editForm.category ||
      !editForm.date
    ) {
      alert("Por favor completa todos los campos");
      return;
    }

    // Asegurarse de que amount sea número
    const validatedForm = {
      ...editForm,
      amount:
        typeof editForm.amount === "string"
          ? parseFloat(editForm.amount)
          : editForm.amount,
    };

    onEditTransaction(id, validatedForm);
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const expenseCategories = [
    "Alimentación",
    "Transporte",
    "Vivienda",
    "Ocio",
    "Educación",
    "Servicios",
    "Salud",
    "Ropa",
    "Otros",
  ];

  const incomeCategories = [
    "Salario",
    "Freelance",
    "Inversiones",
    "Extra",
    "Otros",
  ];

  if (transactions.length === 0) {
    return (
      <div className="bg-linear-to-br from-gray-50 to-slate-50 rounded-2xl p-12 shadow-sm border border-white/50 text-center">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          No hay transacciones
        </h3>
        <p className="text-gray-600">
          Haz clic en el botón "+" para agregar tu primera transacción
        </p>
      </div>
    );
  }

  return (
    <div className="bg-linear-to-br from-slate-50 to-gray-50 rounded-2xl p-6 shadow-sm border border-white/50">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          📋 Historial de Transacciones
        </h3>
        <p className="text-sm text-gray-600">
          {transactions.length} transacción
          {transactions.length !== 1 ? "es" : ""} registrada
          {transactions.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="space-y-3 max-h-125 overflow-y-auto">
        {sortedTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className={`bg-white rounded-xl p-4 border-2 transition-all ${
              editingId === transaction.id
                ? "border-indigo-400 shadow-lg"
                : transaction.type === "income"
                ? "border-green-200 hover:border-green-300 hover:shadow-md"
                : "border-red-200 hover:border-red-300 hover:shadow-md"
            }`}
          >
            {editingId === transaction.id ? (
              // Modo edición
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Descripción
                    </label>
                    <input
                      type="text"
                      value={editForm.description}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Monto
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={editForm.amount}
                      onChange={(e) => {
                        const value = e.target.value;
                        setEditForm({
                          ...editForm,
                          amount: value === "" ? 0 : parseFloat(value),
                        });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Categoría
                    </label>
                    <select
                      value={editForm.category}
                      onChange={(e) =>
                        setEditForm({ ...editForm, category: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900"
                    >
                      {(editForm.type === "expense"
                        ? expenseCategories
                        : incomeCategories
                      ).map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Fecha
                    </label>
                    <input
                      type="date"
                      value={editForm.date}
                      onChange={(e) =>
                        setEditForm({ ...editForm, date: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => handleSaveEdit(transaction.id)}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700"
                  >
                    ✓ Guardar
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-400"
                  >
                    ✕ Cancelar
                  </button>
                </div>
              </div>
            ) : (
              // Modo vista
              <div className="flex items-start justify-between gap-4">
                {/* Icono y detalles */}
                <div className="flex items-start gap-3 flex-1">
                  <div className="text-3xl">
                    {getCategoryIcon(transaction.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 truncate">
                      {transaction.description}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-600">
                        {transaction.category}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-600">
                        {formatDate(transaction.date)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Monto y botones */}
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p
                      className={`text-lg font-bold ${
                        transaction.type === "income"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"} S/{" "}
                      {transaction.amount.toLocaleString("es-PE", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                    <p className="text-xs text-gray-500">
                      {transaction.type === "income" ? "Ingreso" : "Gasto"}
                    </p>
                  </div>
                  <button
                    onClick={() => handleStartEdit(transaction)}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                    title="Editar transacción"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => onDeleteTransaction(transaction.id)}
                    className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                    title="Eliminar transacción"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
