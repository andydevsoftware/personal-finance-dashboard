"use client";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  color?: string;
}

export default function MetricCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendValue,
  color = "bg-gradient-to-br from-blue-50 to-blue-100",
}: MetricCardProps) {
  const getTrendColor = () => {
    if (!trend) return "";
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      case "neutral":
        return "text-gray-600";
      default:
        return "";
    }
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    switch (trend) {
      case "up":
        return "↑";
      case "down":
        return "↓";
      case "neutral":
        return "→";
      default:
        return null;
    }
  };

  return (
    <div
      className={`${color} rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-white/50`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="text-4xl opacity-80">{icon}</div>
      </div>

      {(subtitle || trend) && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/50">
          {subtitle && <p className="text-xs text-gray-600">{subtitle}</p>}
          {trend && trendValue && (
            <span
              className={`text-xs font-semibold ${getTrendColor()} flex items-center gap-1`}
            >
              <span>{getTrendIcon()}</span>
              {trendValue}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
