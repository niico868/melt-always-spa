import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { DashboardPage, PrimaryButton } from "@/components/dashboard/DashboardPage";
import { DataTable, type Column } from "@/components/dashboard/DataTable";
import { Modal, Field, inputCls } from "@/components/dashboard/Modal";
import { useEmployees, useUpsertEmployee, useDeleteEmployee, type Employee } from "@/lib/dashboard-tables";

export const Route = createFileRoute("/dashboard/employees")({ component: EmployeesPage });

function EmployeesPage() {
  const { data, isLoading, error } = useEmployees();
  const upsert = useUpsertEmployee();
  const del = useDeleteEmployee();
  const [editing, setEditing] = useState<Partial<Employee> | null>(null);

  const columns: Column<Employee>[] = [
    { key: "avatar", header: "", render: r => (
      <span className="inline-flex w-6 h-6 rounded-full items-center justify-center text-[10px] font-bold text-[#E8246A]" style={{ background: r.avatar_tone }}>
        {r.full_name.split(/\s+/).map(p => p[0]).slice(0, 2).join("").toUpperCase()}
      </span>
    ) },
    { key: "full_name", header: "Name", render: r => <span className="font-medium text-gray-800">{r.full_name}</span> },
    { key: "role", header: "Role" },
    { key: "slots_total", header: "Daily slots", className: "text-right" },
  ];

  return (
    <DashboardPage
      title="Employees"
      subtitle={`${data?.length ?? 0} team members`}
      actions={<PrimaryButton onClick={() => setEditing({})}><Plus size={14} className="inline mr-1" />Add employee</PrimaryButton>}
    >
      <DataTable
        rows={data} columns={columns} loading={isLoading} error={error}
        searchPlaceholder="Search team…" empty="No employees yet."
        rowActions={r => (
          <div className="flex gap-1 justify-end">
            <button onClick={() => setEditing(r)} className="p-1 text-gray-400 hover:text-[#E8246A]"><Pencil size={13} /></button>
            <button onClick={() => { if (confirm(`Delete ${r.full_name}?`)) del.mutate(r.id); }} className="p-1 text-gray-400 hover:text-red-500"><Trash2 size={13} /></button>
          </div>
        )}
      />
      <Modal open={editing !== null} onClose={() => setEditing(null)} title={editing?.id ? "Edit employee" : "Add employee"}>
        <form
          onSubmit={e => {
            e.preventDefault();
            const f = new FormData(e.currentTarget);
            upsert.mutate({
              id: editing?.id,
              full_name: String(f.get("full_name") || "").trim(),
              role: String(f.get("role") || "Therapist"),
              slots_total: Number(f.get("slots_total") || 8),
              avatar_tone: String(f.get("avatar_tone") || "#FDF2F7"),
            }, { onSuccess: () => setEditing(null) });
          }}
        >
          <Field label="Full name"><input name="full_name" defaultValue={editing?.full_name ?? ""} required className={inputCls} /></Field>
          <Field label="Role"><input name="role" defaultValue={editing?.role ?? "Therapist"} className={inputCls} /></Field>
          <Field label="Daily appointment slots"><input name="slots_total" type="number" defaultValue={editing?.slots_total ?? 8} className={inputCls} /></Field>
          <Field label="Avatar color"><input name="avatar_tone" type="color" defaultValue={editing?.avatar_tone ?? "#FDF2F7"} className="w-16 h-8 border border-gray-200 rounded" /></Field>
          <div className="flex justify-end gap-2 mt-2">
            <button type="button" onClick={() => setEditing(null)} className="px-3 py-1.5 text-xs text-gray-600">Cancel</button>
            <PrimaryButton type="submit">{upsert.isPending ? "Saving…" : "Save"}</PrimaryButton>
          </div>
        </form>
      </Modal>
    </DashboardPage>
  );
}