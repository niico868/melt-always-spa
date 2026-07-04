import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { DashboardPage, PrimaryButton } from "@/components/dashboard/DashboardPage";
import { DataTable, fmtMoney, type Column } from "@/components/dashboard/DataTable";
import { Modal, Field, inputCls } from "@/components/dashboard/Modal";
import { useProducts, useUpsertProduct, useDeleteProduct, type Product } from "@/lib/dashboard-tables";

export const Route = createFileRoute("/dashboard/products")({ component: ProductsPage });

function ProductsPage() {
  const { data, isLoading, error } = useProducts();
  const upsert = useUpsertProduct();
  const del = useDeleteProduct();
  const [editing, setEditing] = useState<Partial<Product> | null>(null);

  const columns: Column<Product>[] = [
    { key: "name", header: "Product", render: r => <span className="font-medium text-gray-800">{r.name}</span> },
    { key: "sku", header: "SKU", render: r => r.sku ?? "—" },
    { key: "price", header: "Price", className: "text-right", render: r => fmtMoney(r.price) },
    { key: "stock", header: "Stock", className: "text-right", render: r => (
      <span className={r.stock <= r.low_stock_threshold ? "text-red-500 font-medium" : "text-gray-700"}>{r.stock}</span>
    ) },
  ];

  return (
    <DashboardPage
      title="Products"
      subtitle={`${data?.length ?? 0} products`}
      actions={<PrimaryButton onClick={() => setEditing({})}><Plus size={14} className="inline mr-1" />Add product</PrimaryButton>}
    >
      <DataTable
        rows={data} columns={columns} loading={isLoading} error={error}
        searchPlaceholder="Search products…" empty="No products yet."
        rowActions={r => (
          <div className="flex gap-1 justify-end">
            <button onClick={() => setEditing(r)} className="p-1 text-gray-400 hover:text-[#E8246A]"><Pencil size={13} /></button>
            <button onClick={() => { if (confirm(`Delete ${r.name}?`)) del.mutate(r.id); }} className="p-1 text-gray-400 hover:text-red-500"><Trash2 size={13} /></button>
          </div>
        )}
      />
      <Modal open={editing !== null} onClose={() => setEditing(null)} title={editing?.id ? "Edit product" : "Add product"}>
        <form
          onSubmit={e => {
            e.preventDefault();
            const f = new FormData(e.currentTarget);
            upsert.mutate({
              id: editing?.id,
              name: String(f.get("name") || "").trim(),
              sku: String(f.get("sku") || ""),
              price: Number(f.get("price") || 0),
              stock: Number(f.get("stock") || 0),
              low_stock_threshold: Number(f.get("low_stock_threshold") || 5),
            }, { onSuccess: () => setEditing(null) });
          }}
        >
          <Field label="Name"><input name="name" defaultValue={editing?.name ?? ""} required className={inputCls} /></Field>
          <Field label="SKU"><input name="sku" defaultValue={editing?.sku ?? ""} className={inputCls} /></Field>
          <Field label="Price (TT$)"><input name="price" type="number" step="0.01" defaultValue={editing?.price ?? 0} required className={inputCls} /></Field>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Stock"><input name="stock" type="number" defaultValue={editing?.stock ?? 0} className={inputCls} /></Field>
            <Field label="Low-stock alert at"><input name="low_stock_threshold" type="number" defaultValue={editing?.low_stock_threshold ?? 5} className={inputCls} /></Field>
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <button type="button" onClick={() => setEditing(null)} className="px-3 py-1.5 text-xs text-gray-600">Cancel</button>
            <PrimaryButton type="submit">{upsert.isPending ? "Saving…" : "Save"}</PrimaryButton>
          </div>
        </form>
      </Modal>
    </DashboardPage>
  );
}