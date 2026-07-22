"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ResetPassword() {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleUpdatePassword = async () => {

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert("Password updated successfully.");
      router.push("/login");
    }
  };

  return (
    
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">

    <div className="bg-white w-[450px] rounded-3xl shadow-2xl p-8">

      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-2">
        Reset Password 🔒
      </h1>

      <p className="text-center text-gray-500 mb-8">
        Enter your new password below
      </p>

      {/* New Password */}

      <div className="mb-5">
        <label className="block mb-2 font-semibold text-gray-700">
          New Password
        </label>

        <input
          type="password"
          placeholder="Enter New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Confirm Password */}

      <div className="mb-8">
        <label className="block mb-2 font-semibold text-gray-700">
          Confirm Password
        </label>

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <button
        onClick={handleUpdatePassword}
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-xl hover:scale-105 transition"
      >
        {loading ? "Updating..." : "Update Password"}
      </button>

    </div>

  </div>

  );
}