"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { toast } from "sonner";
import { ShieldCheck } from "lucide-react";

export default function AdminLogin() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await api.post("/admin/login", { phone, password });

      localStorage.setItem("token", res.data.token);

      toast.success("Login Successful!");
      router.push("/admin/news/create");
    } catch (error) {
      let message = "Login failed";

      if (error.response) {
        message = error.response.data?.message || message;
      } else if (error.request) {
        message = "Server not responding";
      } else {
        message = error.message;
      }

      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
        {/* Top Section */}
        <div className="bg-red-700 p-8 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-4">
            <ShieldCheck className="text-white" size={32} />
          </div>

          <h1 className="text-3xl font-bold text-white">Admin Panel</h1>

          <p className="text-red-100 mt-2 text-sm">Secure login access</p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Phone Number
              </label>

              <input
                type="text"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-300 outline-none focus:ring-2 focus:ring-red-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-300 outline-none focus:ring-2 focus:ring-red-500 transition"
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-3 rounded-xl transition duration-300 shadow-lg hover:shadow-red-900/40"
            >
              Login
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-gray-300 mt-6">
            Protected Administrative Access
          </p>
        </div>
      </div>
    </div>
  );
}
