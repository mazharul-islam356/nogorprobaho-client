"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

export default function DashboardPage() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [coupons, setCoupons] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const [productsRes, ordersRes, couponsRes] = await Promise.all([
        api.get("/products"),
        api.get("/orders"),
        api.get("/coupons"),
      ]);

      setProducts(productsRes.data.data);
      setOrders(ordersRes.data.data);
      setCoupons(couponsRes.data.data);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="poppins">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          Products: {products?.length}
        </div>

        <div className="bg-white p-4 rounded shadow">
          Orders: {orders?.length}
        </div>

        <div className="bg-white p-4 rounded shadow">
          Coupons: {coupons?.length}
        </div>
      </div>
    </div>
  );
}
