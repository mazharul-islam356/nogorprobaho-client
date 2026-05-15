import axios from "axios";

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});

export const authHeader = {
  headers: {
    Authorization: process.env.NEXT_PUBLIC_ADMIN_TOKEN || "",
  },
};
