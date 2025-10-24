"use client";
import useLogin from "@/hooks/useLogin";

function LoginForm() {
  const { formData, loading, errors, handleChange, handleSubmit } = useLogin();
  return (
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
          <label className="block text-gray-700 font-semibold">Password</label>
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

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-linear-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 mt-8"
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
}

export default LoginForm;
