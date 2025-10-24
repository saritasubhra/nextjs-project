"use client";

import useSignup from "@/hooks/useSignup";

function SignupForm() {
  const { formData, loading, errors, handleChange, handleSubmit } = useSignup();
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Full Name */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Full Name
        </label>
        <input
          type="text"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition ${
            errors.fullname
              ? "border-red-400 bg-red-50"
              : "border-yellow-200 focus:border-yellow-400 bg-yellow-50"
          }`}
          placeholder="John Doe"
        />
        {errors.fullname && (
          <p className="text-red-600 text-sm mt-1">{errors.fullname}</p>
        )}
      </div>

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

      {/* Phone */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition ${
            errors.phone
              ? "border-red-400 bg-red-50"
              : "border-yellow-200 focus:border-yellow-400 bg-yellow-50"
          }`}
          placeholder="9876543210"
        />
        {errors.phone && (
          <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Address */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Delivery Address
        </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows="2"
          className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition resize-none ${
            errors.address
              ? "border-red-400 bg-red-50"
              : "border-yellow-200 focus:border-yellow-400 bg-yellow-50"
          }`}
          placeholder="123 Main Street, City"
        />
        {errors.address && (
          <p className="text-red-600 text-sm mt-1">{errors.address}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Password
        </label>
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

      {/* Confirm Password */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          name="passwordConfirm"
          value={formData.passwordConfirm}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition ${
            errors.passwordConfirm
              ? "border-red-400 bg-red-50"
              : "border-yellow-200 focus:border-yellow-400 bg-yellow-50"
          }`}
          placeholder="••••••••"
        />
        {errors.passwordConfirm && (
          <p className="text-red-600 text-sm mt-1">{errors.passwordConfirm}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-linear-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 mt-6"
      >
        {loading ? "Creating Account..." : "Sign Up"}
      </button>
    </form>
  );
}

export default SignupForm;
