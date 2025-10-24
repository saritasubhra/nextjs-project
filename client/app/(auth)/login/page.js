import Link from "next/link";
import LoginForm from "@/app/_components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-yellow-50 via-white to-yellow-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding & Offers */}
          <div className="hidden md:flex flex-col justify-center items-center space-y-6">
            <div className="text-7xl animate-bounce">🍕</div>
            <h1 className="text-4xl font-bold text-center text-gray-900">
              Welcome Back to <span className="text-yellow-500">SliceNow</span>
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

            <LoginForm />

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
