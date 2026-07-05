import { useMemo, useState, useRef, useEffect, type ReactNode } from "react";
import { Search, Loader2, SlidersHorizontal, MoreVertical, Download, CheckSquare, Square } from "lucide-react";

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
  selectable = true,
  exportName = "export",
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
  selectable?: boolean;
  exportName?: string;
}) {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<Set<string | number>>(new Set());
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!menuOpen) return;
    const onDoc = (e: MouseEvent) => { if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [menuOpen]);
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

  function toggle(id: string | number) {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }
  const allSelected = filtered.length > 0 && filtered.every(r => selected.has(r.id));
  function toggleAll() {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(filtered.map(r => r.id)));
  }

  function exportCsv(source: T[]) {
    if (source.length === 0) return;
    const header = columns.map(c => c.header || c.key).join(",");
    const escape = (v: unknown) => {
      const s = v == null ? "" : String(v);
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const body = source.map(r => columns.map(c => {
      const v = c.accessor ? c.accessor(r) : (r as any)[c.key];
      return escape(v);
    }).join(",")).join("\n");
    const blob = new Blob([`${header}\n${body}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${exportName}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-gray-100 flex-shrink-0 flex items-center gap-2">
        {searchable && (
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8246A]/30"
            />
          </div>
        )}
        <div className="ml-auto flex items-center gap-1">
          {selected.size > 0 && (
            <span className="text-[11px] text-gray-500 mr-1">{selected.size} selected</span>
          )}
          <button
            type="button"
            onClick={() => setQ("")}
            title="Clear filter"
            className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:text-[#E8246A] hover:border-[#E8246A]/40"
          >
            <SlidersHorizontal size={13} />
          </button>
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen(o => !o)}
              className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:text-[#E8246A] hover:border-[#E8246A]/40"
            >
              <MoreVertical size={13} />
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1 text-xs">
                <button
                  onClick={() => { exportCsv(filtered); setMenuOpen(false); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-gray-50 flex items-center gap-2"
                >
                  <Download size={12} /> Export visible ({filtered.length})
                </button>
                <button
                  disabled={selected.size === 0}
                  onClick={() => { exportCsv(filtered.filter(r => selected.has(r.id))); setMenuOpen(false); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-gray-50 flex items-center gap-2 disabled:opacity-40 disabled:hover:bg-transparent"
                >
                  <Download size={12} /> Export selected ({selected.size})
                </button>
                <div className="border-t border-gray-100 my-1" />
                <button
                  disabled={selected.size === 0}
                  onClick={() => { setSelected(new Set()); setMenuOpen(false); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent"
                >
                  Clear selection
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
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
          <>
          {/* Mobile stacked cards */}
          <div className="md:hidden divide-y divide-gray-100">
            {filtered.map(row => (
              <div
                key={row.id}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={`p-3 ${onRowClick ? "active:bg-gray-50 cursor-pointer" : ""}`}
              >
                <div className="flex items-start gap-2">
                  {selectable && (
                    <button
                      onClick={e => { e.stopPropagation(); toggle(row.id); }}
                      className="text-gray-400 hover:text-[#E8246A] pt-0.5"
                    >
                      {selected.has(row.id) ? <CheckSquare size={14} /> : <Square size={14} />}
                    </button>
                  )}
                  <dl className="flex-1 min-w-0 space-y-1">
                    {columns.map(c => (
                      <div key={c.key} className="flex items-baseline gap-2">
                        <dt className="text-[10px] uppercase tracking-wide text-gray-400 min-w-[70px] flex-shrink-0">{c.header}</dt>
                        <dd className="text-xs text-gray-800 flex-1 min-w-0 break-words">
                          {c.render ? c.render(row) : String((row as any)[c.key] ?? "—")}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  {rowActions && (
                    <div onClick={e => e.stopPropagation()} className="flex-shrink-0">{rowActions(row)}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* Desktop table */}
          <table className="hidden md:table w-full text-xs">
            <thead className="bg-gray-50 text-gray-500 sticky top-0">
              <tr>
                {selectable && (
                  <th className="w-8 px-3 py-2">
                    <button onClick={toggleAll} className="text-gray-400 hover:text-[#E8246A]">
                      {allSelected ? <CheckSquare size={13} /> : <Square size={13} />}
                    </button>
                  </th>
                )}
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
                  {selectable && (
                    <td className="px-3 py-2 w-8" onClick={e => e.stopPropagation()}>
                      <button onClick={() => toggle(row.id)} className="text-gray-400 hover:text-[#E8246A]">
                        {selected.has(row.id) ? <CheckSquare size={13} /> : <Square size={13} />}
                      </button>
                    </td>
                  )}
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
          </>
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