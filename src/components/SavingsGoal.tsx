"use client";

interface SavingsGoalProps {
  income: number;
  expenses: number;
}

export default function SavingsGoal({ income, expenses }: SavingsGoalProps) {
  const savings = income - expenses;
  const savingsPercentage = income > 0 ? (savings / income) * 100 : 0;
  const recommendedPercentage = 20;
  const isOnTrack = savingsPercentage >= recommendedPercentage;

  // Calcular barra de progreso
  const progressWidth = Math.min(
    (savingsPercentage / recommendedPercentage) * 100,
    100
  );

  return (
    <div className="bg-linear-to-br from-emerald-50 to-green-50 rounded-2xl p-6 shadow-sm border border-white/50">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          🎯 Ahorro Inteligente
        </h3>
        <p className="text-sm text-gray-600">
          {isOnTrack
            ? "¡Excelente! Estás cumpliendo tu meta de ahorro"
            : "Estás ahorrando por debajo del nivel recomendado"}
        </p>
      </div>

      {/* Métrica principal */}
      <div className="bg-white/60 rounded-xl p-6 mb-6">
        <div className="text-center mb-4">
          <p className="text-sm text-gray-600 mb-1">Ahorro mensual</p>
          <p
            className={`text-4xl font-bold ${
              savings >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            S/ {savings.toLocaleString()}
          </p>
        </div>

        {/* Barra de progreso */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-600 mb-2">
            <span>Progreso</span>
            <span>{savingsPercentage.toFixed(1)}% de tus ingresos</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                isOnTrack
                  ? "bg-linear-to-r from-green-400 to-emerald-500"
                  : "bg-linear-to-r from-yellow-400 to-orange-500"
              }`}
              style={{ width: `${progressWidth}%` }}
            />
          </div>
        </div>

        {/* Meta recomendada */}
        <div className="flex items-center justify-center gap-2 text-sm">
          <span className="text-gray-600">Meta recomendada:</span>
          <span className="font-semibold text-gray-900">
            {recommendedPercentage}%
          </span>
          {isOnTrack ? (
            <span className="text-green-600">✓</span>
          ) : (
            <span className="text-orange-600">⚠</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/60 rounded-lg p-4">
          <p className="text-xs text-gray-600 mb-1">Ingresos</p>
          <p className="text-xl font-bold text-green-600">
            S/ {income.toLocaleString()}
          </p>
        </div>
        <div className="bg-white/60 rounded-lg p-4">
          <p className="text-xs text-gray-600 mb-1">Gastos</p>
          <p className="text-xl font-bold text-red-600">
            S/ {expenses.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Nivel de cumplimiento */}
      <div className="mt-6 pt-6 border-t border-white/50">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Nivel de cumplimiento</span>
          <div className="flex items-center gap-2">
            {isOnTrack ? (
              <>
                <span className="text-2xl">🏆</span>
                <span className="text-sm font-semibold text-green-600">
                  Excelente
                </span>
              </>
            ) : savingsPercentage > 10 ? (
              <>
                <span className="text-2xl">👍</span>
                <span className="text-sm font-semibold text-yellow-600">
                  Bueno
                </span>
              </>
            ) : (
              <>
                <span className="text-2xl">💪</span>
                <span className="text-sm font-semibold text-orange-600">
                  Mejorable
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
