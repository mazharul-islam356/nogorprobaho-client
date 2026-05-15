import api from "@/lib/axios";

// apply coupon
export const applyCoupon = async (code) => {
  const res = await api.post("/coupons/apply", { code });
  return res.data;
};

// admin get coupons
export const getCoupons = async () => {
  const res = await api.get("/admin/coupons");
  return res.data;
};

// create coupon
export const createCoupon = async (data) => {
  const res = await api.post("/admin/coupons", data);
  return res.data;
};
