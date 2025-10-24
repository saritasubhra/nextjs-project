"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      setSuccess(true);

      // Store token if provided
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
      }

      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      setErrors({
        submit:
          error.response?.data?.message ||
          "Login failed. Please check your credentials.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-yellow-50 via-white to-yellow-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding & Offers */}
          <div className="hidden md:flex flex-col justify-center items-center space-y-6">
            <div className="text-7xl animate-bounce">🍕</div>
            <h1 className="text-4xl font-bold text-center text-gray-900">
              Welcome Back to <span className="text-yellow-500">PizzaHub</span>
            </h1>
            <p className="text-gray-600 text-center text-lg">
              Sign in to your account and order delicious pizzas with special
              member discounts
            </p>

            <div className="bg-linear-to-r from-yellow-100 to-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 w-full mt-8 space-y-4">
              <h3 className="text-lg font-bold text-gray-900">
                Member Benefits
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">⭐</span>
                  <p className="text-gray-700">Earn points on every order</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🎁</span>
                  <p className="text-gray-700">
                    Exclusive deals & early access
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🚚</span>
                  <p className="text-gray-700">
                    Free delivery on orders above ₹300
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-yellow-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
              <p className="text-gray-600 mt-2">Sign in to continue</p>
            </div>

            {success && (
              <div className="bg-green-50 border-2 border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center space-x-2">
                <span>✓</span>
                <span>Login successful! Redirecting...</span>
              </div>
            )}

            {errors.submit && (
              <div className="bg-red-50 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center space-x-2">
                <span>⚠</span>
                <span>{errors.submit}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition ${
                    errors.email
                      ? "border-red-400 bg-red-50"
                      : "border-yellow-200 focus:border-yellow-400 bg-yellow-50"
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-gray-700 font-semibold">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-yellow-600 text-sm font-semibold hover:text-yellow-700"
                  >
                    Forgot?
                  </Link>
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition ${
                    errors.password
                      ? "border-red-400 bg-red-50"
                      : "border-yellow-200 focus:border-yellow-400 bg-yellow-50"
                  }`}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-yellow-300 text-yellow-500 focus:ring-yellow-500 cursor-pointer"
                />
                <label
                  htmlFor="rememberMe"
                  className="text-gray-700 font-medium cursor-pointer"
                >
                  Remember me
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-linear-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 mt-8"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-yellow-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-600">
                    or continue as guest
                  </span>
                </div>
              </div>

              {/* Guest Button */}
              <button
                type="button"
                onClick={() => router.push("/")}
                className="w-full border-2 border-yellow-300 hover:border-yellow-400 text-gray-900 font-bold py-3 rounded-lg transition-all duration-300 hover:bg-yellow-50"
              >
                Continue as Guest
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-yellow-600 font-bold hover:text-yellow-700"
                >
                  Sign up now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
