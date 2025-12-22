"use client";

interface Alert {
  type: "warning" | "tip" | "info";
  message: string;
  icon: string;
}

interface AlertsPanelProps {
  alerts: Alert[];
}

export default function AlertsPanel({ alerts }: AlertsPanelProps) {
  const getAlertStyles = (type: string) => {
    switch (type) {
      case "warning":
        return {
          bg: "bg-gradient-to-r from-red-50 to-orange-50",
          border: "border-red-200",
          text: "text-red-700",
          iconBg: "bg-red-100",
        };
      case "tip":
        return {
          bg: "bg-gradient-to-r from-blue-50 to-cyan-50",
          border: "border-blue-200",
          text: "text-blue-700",
          iconBg: "bg-blue-100",
        };
      case "info":
        return {
          bg: "bg-gradient-to-r from-amber-50 to-yellow-50",
          border: "border-amber-200",
          text: "text-amber-700",
          iconBg: "bg-amber-100",
        };
      default:
        return {
          bg: "bg-gray-50",
          border: "border-gray-200",
          text: "text-gray-700",
          iconBg: "bg-gray-100",
        };
    }
  };

  return (
    <div className="bg-linear-to-br from-slate-50 to-gray-50 rounded-2xl p-6 shadow-sm border border-white/50">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          🔔 Alertas y Recomendaciones
        </h3>
        <p className="text-sm text-gray-600">
          Sistema de mensajes inteligentes para mejorar tus finanzas
        </p>
      </div>

      <div className="space-y-4">
        {alerts.map((alert, index) => {
          const styles = getAlertStyles(alert.type);
          return (
            <div
              key={index}
              className={`${styles.bg} rounded-xl p-4 border-2 ${styles.border} hover:shadow-md transition-all`}
            >
              <div className="flex items-start gap-4">
                <div className={`${styles.iconBg} rounded-lg p-3 shrink-0`}>
                  <span className="text-2xl">{alert.icon}</span>
                </div>
                <div className="flex-1">
                  <p
                    className={`text-sm font-medium ${styles.text} leading-relaxed`}
                  >
                    {alert.message}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Resumen de insights */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-red-600">
              {alerts.filter((a) => a.type === "warning").length}
            </p>
            <p className="text-xs text-gray-600">Alertas</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">
              {alerts.filter((a) => a.type === "tip").length}
            </p>
            <p className="text-xs text-gray-600">Tips</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-amber-600">
              {alerts.filter((a) => a.type === "info").length}
            </p>
            <p className="text-xs text-gray-600">Info</p>
          </div>
        </div>
      </div>
    </div>
  );
}
