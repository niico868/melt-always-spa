import { useMemo, useState, type ReactNode } from "react";
import { Search, Loader2 } from "lucide-react";

export type Column<T> = {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
  accessor?: (row: T) => string | number | null | undefined;
  className?: string;
};

export function DataTable<T extends { id: string | number }>({
  rows,
  columns,
  loading,
  error,
  searchable = true,
  searchPlaceholder = "Search…",
  onRowClick,
  empty = "Nothing here yet.",
  rowActions,
}: {
  rows: T[] | undefined;
  columns: Column<T>[];
  loading?: boolean;
  error?: unknown;
  searchable?: boolean;
  searchPlaceholder?: string;
  onRowClick?: (row: T) => void;
  empty?: string;
  rowActions?: (row: T) => ReactNode;
}) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    if (!rows) return [];
    if (!q.trim()) return rows;
    const needle = q.trim().toLowerCase();
    return rows.filter(row =>
      columns.some(c => {
        const val = c.accessor ? c.accessor(row) : (row as any)[c.key];
        return String(val ?? "").toLowerCase().includes(needle);
      }),
    );
  }, [rows, q, columns]);

  return (
    <div className="flex flex-col h-full">
      {searchable && (
        <div className="p-3 border-b border-gray-100 flex-shrink-0">
          <div className="relative max-w-sm">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8246A]/30"
            />
          </div>
        </div>
      )}
      <div className="flex-1 min-h-0 overflow-auto">
        {loading ? (
          <div className="p-8 flex items-center justify-center text-gray-400 text-xs">
            <Loader2 size={16} className="animate-spin mr-2" /> Loading…
          </div>
        ) : error ? (
          <div className="p-8 text-center text-xs text-red-500">
            {(error as Error).message ?? "Failed to load."}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-xs text-gray-400">{empty}</div>
        ) : (
          <table className="w-full text-xs">
            <thead className="bg-gray-50 text-gray-500 sticky top-0">
              <tr>
                {columns.map(c => (
                  <th key={c.key} className={`text-left font-medium px-3 py-2 ${c.className ?? ""}`}>
                    {c.header}
                  </th>
                ))}
                {rowActions && <th className="w-10" />}
              </tr>
            </thead>
            <tbody>
              {filtered.map(row => (
                <tr
                  key={row.id}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  className={`border-t border-gray-100 ${onRowClick ? "cursor-pointer hover:bg-gray-50" : ""}`}
                >
                  {columns.map(c => (
                    <td key={c.key} className={`px-3 py-2 ${c.className ?? ""}`}>
                      {c.render ? c.render(row) : String((row as any)[c.key] ?? "—")}
                    </td>
                  ))}
                  {rowActions && (
                    <td className="px-3 py-2 text-right" onClick={e => e.stopPropagation()}>
                      {rowActions(row)}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export function fmtMoney(n: number | null | undefined) {
  if (n == null) return "—";
  return `TT$${Number(n).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

export function fmtDate(iso: string | null | undefined) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function fmtDateTime(iso: string | null | undefined) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}