"use client";

import { useState } from "react";

interface TransactionFormProps {
  onAddTransaction: (transaction: {
    description: string;
    amount: number;
    category: string;
    type: "income" | "expense";
    date: string;
  }) => void;
}

export default function TransactionForm({
  onAddTransaction,
}: TransactionFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
    type: "expense" as "income" | "expense",
    date: new Date().toISOString().split("T")[0],
  });

  const expenseCategories = [
    { value: "Alimentación", icon: "🍔" },
    { value: "Transporte", icon: "🚕" },
    { value: "Vivienda", icon: "🏠" },
    { value: "Ocio", icon: "🎮" },
    { value: "Educación", icon: "📚" },
    { value: "Servicios", icon: "💡" },
    { value: "Salud", icon: "🏥" },
    { value: "Ropa", icon: "👕" },
    { value: "Otros", icon: "📦" },
  ];

  const incomeCategories = [
    { value: "Salario", icon: "💼" },
    { value: "Freelance", icon: "💻" },
    { value: "Inversiones", icon: "📈" },
    { value: "Extra", icon: "💰" },
    { value: "Otros", icon: "💵" },
  ];

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!formData.description || !formData.amount || !formData.category) {
      alert("Por favor completa todos los campos");
      return;
    }

    onAddTransaction({
      description: formData.description,
      amount: parseFloat(formData.amount),
      category: formData.category,
      type: formData.type,
      date: formData.date,
    });

    // Reset form
    setFormData({
      description: "",
      amount: "",
      category: "",
      type: "expense",
      date: new Date().toISOString().split("T")[0],
    });

    setIsOpen(false);
  };

  const categories =
    formData.type === "expense" ? expenseCategories : incomeCategories;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 z-50 flex items-center gap-2 font-semibold"
      >
        <span className="text-2xl">+</span>
        <span className="hidden md:inline">Agregar Transacción</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-linear-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Nueva Transacción</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* El tipo de transacción */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Tipo de transacción
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        type: "expense",
                        category: "",
                      })
                    }
                    className={`p-4 rounded-xl font-semibold transition-all ${
                      formData.type === "expense"
                        ? "bg-red-100 text-red-700 border-2 border-red-500"
                        : "bg-gray-100 text-gray-600 border-2 border-transparent"
                    }`}
                  >
                    💸 Gasto
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, type: "income", category: "" })
                    }
                    className={`p-4 rounded-xl font-semibold transition-all ${
                      formData.type === "income"
                        ? "bg-green-100 text-green-700 border-2 border-green-500"
                        : "bg-gray-100 text-gray-600 border-2 border-transparent"
                    }`}
                  >
                    💰 Ingreso
                  </button>
                </div>
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Descripción
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Ej: Compra en supermercado"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors text-gray-900 placeholder-gray-400 bg-white"
                />
              </div>

              {/* Monto */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Monto (S/)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  placeholder="0.00"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors text-gray-900 placeholder-gray-400 bg-white"
                />
              </div>

              {/* Categoría */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Categoría
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors text-gray-900 bg-white"
                >
                  <option value="" className="text-gray-400">
                    Selecciona una categoría
                  </option>
                  {categories.map((cat) => (
                    <option
                      key={cat.value}
                      value={cat.value}
                      className="text-gray-900"
                    >
                      {cat.icon} {cat.value}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fecha */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Fecha
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors text-gray-900 bg-white"
                />
              </div>

              {/* Botones */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
