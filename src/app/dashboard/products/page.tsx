"use client";
import { ColumnDef, DataTable } from "@/components/utils/DataTable";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CreateProductModal } from "./components/CreateProductModal";

interface MyItem {
  id: number;
  name: string;
  category: string;
}

// Define columns
const columns: ColumnDef<MyItem>[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "category", label: "Category" },
];

const ProductPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const route = useRouter();
  const [items, setItems] = useState<MyItem[]>([
    { id: 1, name: "Item A", category: "Category 1" },
    { id: 2, name: "Item B", category: "Category 2" },
    { id: 3, name: "Item C", category: "Category 1" },
    { id: 4, name: "Item D", category: "Category 3" },
    { id: 5, name: "Item E", category: "Category 2" },
    { id: 6, name: "Item F", category: "Category 3" },
    { id: 7, name: "Item G", category: "Category 1" },
    { id: 8, name: "Item H", category: "Category 2" },
  ]);

  const handleCreate = () => {
    setModalOpen(true);
  };

  const handleCreateProduct = () => {
    // setItems((prev) => [...prev, productData]);
  };

  // Delete multiple items by their string IDs
  // (We stored them as numbers originally, so we convert)
  const handleDeleteSelected = (ids: string[]) => {
    const idsAsNumbers = ids.map(Number);
    setItems((prev) => prev.filter((item) => !idsAsNumbers.includes(item.id)));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Products</h1>
      <CreateProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreateProduct}
      />

      <DataTable<MyItem>
        data={items}
        columns={columns}
        getRowId={(item) => String(item.id)}
        onCreate={handleCreate}
        onDeleteSelected={handleDeleteSelected}
        tableTitle="My Items with Pagination"
        searchPlaceholder="Search items..."
        enablePagination={true}
        initialPageSize={5}
      />
    </div>
  );
};

export default ProductPage;
