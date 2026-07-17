"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

     if (!email.trim()) {
    alert("Please enter your email address.");
    return;
  }

  if (!password.trim()) {
    alert("Please enter your password.");
    return;
  }
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });
   

    if (error) {
        alert(error.message);
        return;
    }

   

    alert("Login Successful");

    router.push("/dashboard");
}
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl p-8">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-700">
            Welcome Back 👋
          </h1>

          <p className="mt-2 text-gray-500">
            Login to continue
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleLogin}>

          {/* Email */}
          <div>
            <label className="block text-blue-700 font-bold mb-2">
              Email Address
            </label>

            <input
                type="email"
                placeholder="Enter Your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border-2 border-blue-200 px-4 py-3
text-black
placeholder:text-gray-400
focus:border-blue-500
focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-purple-700 font-bold mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                 value={password}
  onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-xl border-2 border-purple-200 px-4 py-3 pr-20
text-black
placeholder:text-gray-400
focus:border-purple-500
focus:outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-blue-600 font-semibold"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Remember Me + Forgot Password */}
          <div className="flex items-center justify-between text-sm">

            <label className="flex items-center gap-2 text-gray-700">
              <input type="checkbox" />
              Remember Me
            </label>

            <Link
              href="/forgotpassword"
              className="font-semibold text-purple-700 hover:text-pink-600"
            >
              Forgot Password?
            </Link>

          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3 text-lg font-bold text-white hover:from-purple-600 hover:to-pink-600 transition"
          >
            Login
          </button>

          {/* Sign Up */}
          <p className="text-center text-gray-700">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-bold text-blue-700 hover:text-purple-700"
            >
              Create Account
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}