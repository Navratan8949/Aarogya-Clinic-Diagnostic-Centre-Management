export default function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendPositive,
  colorScheme = "teal",
  onClick
}) {
  const schemeMap = {
    teal: {
      bg: "bg-teal-50",
      iconBg: "bg-teal-600 text-white",
      border: "hover:border-teal-300",
      accent: "text-teal-700"
    },
    blue: {
      bg: "bg-blue-50",
      iconBg: "bg-blue-600 text-white",
      border: "hover:border-blue-300",
      accent: "text-blue-700"
    },
    indigo: {
      bg: "bg-indigo-50",
      iconBg: "bg-indigo-600 text-white",
      border: "hover:border-indigo-300",
      accent: "text-indigo-700"
    },
    amber: {
      bg: "bg-amber-50",
      iconBg: "bg-amber-600 text-white",
      border: "hover:border-amber-300",
      accent: "text-amber-700"
    },
    rose: {
      bg: "bg-rose-50",
      iconBg: "bg-rose-600 text-white",
      border: "hover:border-rose-300",
      accent: "text-rose-700"
    },
    emerald: {
      bg: "bg-emerald-50",
      iconBg: "bg-emerald-600 text-white",
      border: "hover:border-emerald-300",
      accent: "text-emerald-700"
    }
  };

  const scheme = schemeMap[colorScheme] || schemeMap.teal;

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl p-5 border border-slate-200/90 shadow-sm transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:shadow-md ' + scheme.border : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold tracking-tight text-slate-900">{value}</h3>
            {trend && (
              <span
                className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${
                  trendPositive ? 'text-emerald-700 bg-emerald-50' : 'text-slate-600 bg-slate-100'
                }`}
              >
                {trend}
              </span>
            )}
          </div>
          {subtitle && <p className="text-xs text-slate-500 pt-0.5">{subtitle}</p>}
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-lg shadow-sm ${scheme.iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
}
