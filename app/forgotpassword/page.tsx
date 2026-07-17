"use client";

import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl p-8">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-700">
            Forgot Password 🔑
          </h1>

          <p className="mt-2 text-gray-500">
            Enter your registered email to reset your password
          </p>
        </div>

        <form className="space-y-6">

          {/* Email */}
          <div>
            <label className="block mb-2 text-lg font-bold text-blue-700">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your registered email"
              className="w-full rounded-xl border-2 border-blue-200 px-4 py-3 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Send Reset Link Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3 text-lg font-bold text-white hover:from-purple-600 hover:to-pink-600 transition duration-300"
          >
            Send Reset Link
          </button>

          {/* Back to Login */}
          <p className="text-center text-gray-700">
            Remember your password?{" "}
            <Link
              href="/login"
              className="font-bold text-blue-700 hover:text-purple-700"
            >
              Back to Login
            </Link>
          </p>

        </form>

      </div>
    </div>
  );
}