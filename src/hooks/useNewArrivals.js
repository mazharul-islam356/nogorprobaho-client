import api from "@/lib/axios";
import { useEffect, useState } from "react";

const useNewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNewArrivals = async () => {
    try {
      setLoading(true);
      const res = await api.get("/new-arrivals");
      setProducts(res.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  return { products, loading, error, refetch: fetchNewArrivals };
};

export default useNewArrivals;
