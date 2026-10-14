import { useApp } from '../../context/AppContext.jsx';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let bg = "bg-white border-emerald-200 text-slate-800";
        let iconColor = "text-emerald-600";

        if (toast.type === 'error') {
          Icon = AlertCircle;
          bg = "bg-white border-rose-200 text-slate-800";
          iconColor = "text-rose-600";
        } else if (toast.type === 'info') {
          Icon = Info;
          bg = "bg-white border-blue-200 text-slate-800";
          iconColor = "text-blue-600";
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg transition-all animate-in slide-in-from-right duration-200 ${bg}`}
          >
            <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} />
            <div className="flex-1 text-xs">
              <h4 className="font-semibold text-slate-900 text-sm mb-0.5">{toast.title}</h4>
              <p className="text-slate-600 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
