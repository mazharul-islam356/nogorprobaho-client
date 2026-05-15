import api from "@/lib/axios";
import { useState, useEffect } from "react";

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all orders (Admin)
  const fetchOrders = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/get-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) setOrders(res.data.data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  // Create order (Customer)
  const createOrder = async (payload) => {
    try {
      const res = await api.post("/place-order", payload);
      return res.data;
    } catch (err) {
      console.error(err);
      return { success: false, message: err.message };
    }
  };

  // Update order status (Admin)
  const updateOrderStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      // ✅ Pass headers as the 3rd argument to axios.put
      const res = await api.put(
        `/update-order/${id}`,
        { status }, // request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await fetchOrders();
      return res.data;
    } catch (err) {
      console.error(err);
      return { success: false, message: err.message };
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOrders();
  }, []);

  return {
    orders,
    loading,
    fetchOrders,
    createOrder,
    updateOrderStatus,
  };
};
