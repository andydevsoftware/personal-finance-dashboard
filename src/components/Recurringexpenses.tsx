"use client";

import { useState } from "react";

export interface RecurringExpense {
  name: string;
  amount: number;
  icon: string;
}

interface RecurringExpensesProps {
  expenses: RecurringExpense[];
  onUpdateExpense: (index: number, amount: number) => void;
  onDeleteExpense: (index: number) => void;
  onAddExpense: (expense: RecurringExpense) => void;
}

export default function RecurringExpenses({
  expenses,
  onUpdateExpense,
  onDeleteExpense,
  onAddExpense,
}: RecurringExpensesProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editAmount, setEditAmount] = useState<string>("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newExpense, setNewExpense] = useState({
    name: "",
    amount: "",
    icon: "📦",
  });

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const handleStartEdit = (index: number, currentAmount: number) => {
    setEditingIndex(index);
    setEditAmount(currentAmount.toString());
  };

  const handleSaveEdit = (index: number) => {
    const amount = parseFloat(editAmount);
    if (!isNaN(amount) && amount >= 0) {
      onUpdateExpense(index, amount);
    }
    setEditingIndex(null);
    setEditAmount("");
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditAmount("");
  };

  const handleDelete = (index: number) => {
    onDeleteExpense(index);
  };

  const handleAddExpense = () => {
    const amount = parseFloat(newExpense.amount);
    if (newExpense.name.trim() && !isNaN(amount) && amount > 0) {
      onAddExpense({
        name: newExpense.name.trim(),
        amount: amount,
        icon: newExpense.icon,
      });
      setNewExpense({ name: "", amount: "", icon: "📦" });
      setShowAddForm(false);
    } else {
      alert("Por favor completa todos los campos correctamente");
    }
  };

  const availableIcons = [
    "📺",
    "🎵",
    "📱",
    "🌐",
    "💪",
    "📦",
    "🎮",
    "💡",
    "🚗",
    "🏋️",
    "🎬",
    "📚",
  ];

  return (
    <div className="bg-linear-to-br from-violet-50 to-purple-50 rounded-2xl p-6 shadow-sm border border-white/50">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900">
            🔄 Gastos Recurrentes
          </h3>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="text-sm bg-violet-600 text-white px-3 py-1 rounded-lg hover:bg-violet-700 transition-colors"
          >
            {showAddForm ? "Cancelar" : "+ Agregar"}
          </button>
        </div>
        <p className="text-sm text-gray-600">
          Gestiona tus suscripciones y pagos mensuales
        </p>
      </div>

      {/* Formulario para agregar nuevo gasto */}
      {showAddForm && (
        <div className="mb-4 bg-white/80 rounded-xl p-4 border-2 border-violet-200">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                type="text"
                value={newExpense.name}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, name: e.target.value })
                }
                placeholder="Ej: Netflix, Spotify..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-gray-900 placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monto (S/)
              </label>
              <input
                type="number"
                step="0.01"
                value={newExpense.amount}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, amount: e.target.value })
                }
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-gray-900 placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Icono
              </label>
              <div className="flex flex-wrap gap-2">
                {availableIcons.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setNewExpense({ ...newExpense, icon })}
                    className={`text-2xl p-2 rounded-lg transition-all ${
                      newExpense.icon === icon
                        ? "bg-violet-200 scale-110"
                        : "bg-white/60 hover:bg-white"
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={handleAddExpense}
              className="w-full bg-violet-600 text-white py-2 rounded-lg font-medium hover:bg-violet-700 transition-colors"
            >
              Agregar Gasto
            </button>
          </div>
        </div>
      )}

      {/* Lista de gastos */}
      {expenses.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-4xl mb-2">📦</p>
          <p className="text-gray-600">No hay gastos recurrentes</p>
          <p className="text-sm text-gray-500">
            Agrega tus suscripciones mensuales
          </p>
        </div>
      ) : (
        <div className="space-y-3 mb-6">
          {expenses.map((expense, index) => (
            <div
              key={index}
              className="bg-white/60 rounded-lg p-4 hover:bg-white/80 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1"
            >
              {editingIndex === index ? (
                // Modo edición
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{expense.icon}</span>
                  <span className="font-medium text-gray-900 flex-1">
                    {expense.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="0.01"
                      value={editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
                      className="w-24 px-2 py-1 border border-gray-300 rounded text-right text-gray-900"
                      autoFocus
                    />
                    <button
                      onClick={() => handleSaveEdit(index)}
                      className="text-green-600 hover:text-green-700 hover:bg-green-100 p-2 rounded-lg transition-all duration-200 hover:scale-110 font-bold text-lg"
                      title="Guardar"
                    >
                      ✓
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="text-red-600 hover:text-red-700 hover:bg-red-100 p-2 rounded-lg transition-all duration-200 hover:scale-110 font-bold text-lg"
                      title="Cancelar"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ) : (
                // Modo vista
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{expense.icon}</span>
                    <span className="font-medium text-gray-900">
                      {expense.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">
                      S/ {expense.amount.toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleStartEdit(index, expense.amount)}
                      className="text-violet-600 hover:text-violet-700 hover:bg-violet-100 p-2 rounded-lg transition-all duration-200 hover:scale-110"
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-100 p-2 rounded-lg transition-all duration-200 hover:scale-110"
                      title="Eliminar"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Total */}
      {expenses.length > 0 && (
        <>
          <div className="bg-linear-to-r from-violet-100 to-purple-100 rounded-xl p-4 border-2 border-purple-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Total mensual
              </span>
              <div className="text-right">
                <p className="text-2xl font-bold text-purple-700">
                  S/ {total.toFixed(2)}
                </p>
                <p className="text-xs text-purple-600">
                  {expenses.length} pago{expenses.length !== 1 ? "s" : ""}{" "}
                  recurrente{expenses.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </div>

          {/* Mensaje como consejo */}
          <div className="mt-6 p-4 bg-purple-100/50 rounded-lg border border-purple-200">
            <p className="text-xs text-gray-700">
              💡 <span className="font-semibold">Tip:</span> Revisa tus
              suscripciones periódicamente. Cancela las que no uses para ahorrar
              más.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
