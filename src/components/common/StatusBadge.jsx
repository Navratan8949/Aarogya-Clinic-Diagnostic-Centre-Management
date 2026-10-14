export default function StatusBadge({ status, size = "md" }) {
  if (!status) return null;

  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-xs font-medium" : "px-2.5 py-1 text-xs font-semibold";

  let colorClasses = "bg-slate-100 text-slate-700 border-slate-200";

  switch (status.toLowerCase()) {
    // Appointment / Queue
    case "scheduled":
      colorClasses = "bg-blue-50 text-blue-700 border-blue-200";
      break;
    case "checked in":
      colorClasses = "bg-amber-50 text-amber-700 border-amber-200";
      break;
    case "waiting":
      colorClasses = "bg-orange-50 text-orange-700 border-orange-200";
      break;
    case "called":
      colorClasses = "bg-purple-50 text-purple-700 border-purple-200";
      break;
    case "in consultation":
      colorClasses = "bg-indigo-50 text-indigo-700 border-indigo-200";
      break;
    case "completed":
      colorClasses = "bg-emerald-50 text-emerald-700 border-emerald-200";
      break;
    case "cancelled":
    case "no show":
      colorClasses = "bg-rose-50 text-rose-700 border-rose-200";
      break;

    // Laboratory & Samples
    case "awaiting collection":
      colorClasses = "bg-yellow-50 text-yellow-800 border-yellow-200";
      break;
    case "sample collected":
    case "collected":
      colorClasses = "bg-teal-50 text-teal-700 border-teal-200";
      break;
    case "received in lab":
    case "processing":
    case "in processing":
      colorClasses = "bg-blue-50 text-blue-700 border-blue-200";
      break;
    case "results entered":
    case "partially completed":
      colorClasses = "bg-purple-50 text-purple-700 border-purple-200";
      break;
    case "awaiting review":
      colorClasses = "bg-amber-50 text-amber-800 border-amber-200";
      break;
    case "approved":
      colorClasses = "bg-emerald-50 text-emerald-800 border-emerald-200";
      break;
    case "released":
    case "report released":
      colorClasses = "bg-emerald-100 text-emerald-800 border-emerald-300";
      break;
    case "rejected":
    case "sample rejected":
      colorClasses = "bg-rose-50 text-rose-700 border-rose-200";
      break;

    // Billing & Payments
    case "paid":
      colorClasses = "bg-emerald-50 text-emerald-700 border-emerald-200";
      break;
    case "partial":
      colorClasses = "bg-amber-50 text-amber-700 border-amber-200";
      break;
    case "unpaid":
      colorClasses = "bg-rose-50 text-rose-700 border-rose-200";
      break;

    // Inventory
    case "adequate":
      colorClasses = "bg-emerald-50 text-emerald-700 border-emerald-200";
      break;
    case "low stock":
      colorClasses = "bg-amber-50 text-amber-700 border-amber-200";
      break;
    case "expiring soon":
      colorClasses = "bg-rose-50 text-rose-700 border-rose-200";
      break;

    // General
    case "active":
      colorClasses = "bg-teal-50 text-teal-700 border-teal-200";
      break;
    case "high":
    case "urgent":
      colorClasses = "bg-rose-100 text-rose-800 border-rose-300 font-bold";
      break;
    case "normal":
      colorClasses = "bg-emerald-50 text-emerald-700 border-emerald-200";
      break;
    default:
      colorClasses = "bg-slate-100 text-slate-700 border-slate-200";
  }

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border ${sizeClasses} ${colorClasses}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70"></span>
      {status}
    </span>
  );
}
