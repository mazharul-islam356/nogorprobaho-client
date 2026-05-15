import api from "@/lib/axios";

// create order
export const createOrder = async (data) => {
  const res = await api.post("/orders", data);
  return res.data;
};

// get user orders
export const getOrders = async () => {
  const res = await api.get("/orders");
  return res.data;
};

// admin get orders
export const getAdminOrders = async () => {
  const res = await api.get("/admin/orders");
  return res.data;
};

// update order status
export const updateOrderStatus = async (id, status) => {
  const res = await api.patch(`/admin/orders/${id}`, { status });
  return res.data;
};
