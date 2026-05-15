"use client";

import { useEffect, useState } from "react";
import { api, authHeader } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Categories() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);

  const fetchCategories = async () => {
    const res = await api.get("/categories");
    setList(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async () => {
    await api.post("/categories", { name }, authHeader);
    setName("");
    fetchCategories();
  };

  const handleDelete = async (id) => {
    await api.delete(`/categories/${id}`, authHeader);
    fetchCategories();
  };

  return (
    <div className="p-6 max-w-xl space-y-4">
      <h1 className="text-xl font-bold">Categories</h1>

      <div className="flex gap-2">
        <Input value={name} onChange={(e) => setName(e.target.value)} />
        <Button onClick={handleAdd}>Add</Button>
      </div>

      <div className="space-y-2">
        {list.map((cat) => (
          <div
            key={cat._id}
            className="flex justify-between border p-2 rounded"
          >
            <span>{cat.name}</span>
            <Button variant="destructive" onClick={() => handleDelete(cat._id)}>
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
