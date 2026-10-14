/**
 * CSV Export utility for AarogyaDesk
 */

export function exportToCSV(filename, rows, headers) {
  if (!rows || !rows.length) {
    alert("No data to export");
    return;
  }

  const keys = headers ? headers.map(h => h.key) : Object.keys(rows[0]);
  const headerLabels = headers ? headers.map(h => h.label) : keys;

  const csvContent = [
    headerLabels.map(escapeCSV).join(","),
    ...rows.map(row => keys.map(k => escapeCSV(row[k] !== undefined && row[k] !== null ? row[k] : "")).join(","))
  ].join("\r\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function escapeCSV(val) {
  const str = String(val);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}
