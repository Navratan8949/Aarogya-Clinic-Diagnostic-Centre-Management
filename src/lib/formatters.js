/**
 * Formatting and calculation utilities for AarogyaDesk
 */

export function formatCurrency(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) return "₹0";
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatDate(dateString) {
  if (!dateString) return "—";
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
}

export function formatDateTime(dateTimeString) {
  if (!dateTimeString) return "—";
  try {
    const d = new Date(dateTimeString);
    if (isNaN(d.getTime())) return dateTimeString;
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  } catch {
    return dateTimeString;
  }
}

export function calculateBMI(heightCm, weightKg) {
  if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) return { bmi: null, category: "N/A" };
  const heightM = heightCm / 100;
  const bmiVal = Number((weightKg / (heightM * heightM)).toFixed(1));
  let category = "Normal";
  let color = "text-emerald-700 bg-emerald-50";

  if (bmiVal < 18.5) {
    category = "Underweight";
    color = "text-amber-700 bg-amber-50";
  } else if (bmiVal >= 18.5 && bmiVal <= 22.9) {
    // Asian Indian cut-offs
    category = "Normal (Asian Indian)";
    color = "text-emerald-700 bg-emerald-50";
  } else if (bmiVal >= 23.0 && bmiVal <= 24.9) {
    category = "Overweight";
    color = "text-amber-700 bg-amber-50";
  } else {
    category = "Obese";
    color = "text-rose-700 bg-rose-50";
  }

  return { bmi: bmiVal, category, color };
}

export function generateId(prefix = "REC") {
  const random = Math.floor(1000 + Math.random() * 9000);
  const now = new Date();
  const year = now.getFullYear();
  return `${prefix}-${year}-${random}`;
}
