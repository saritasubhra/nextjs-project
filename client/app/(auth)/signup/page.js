import SignupForm from "@/app/_components/SignupForm";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-yellow-50 via-white to-yellow-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding */}
          <div className="hidden md:flex flex-col justify-center items-center space-y-6">
            <div className="text-6xl">🍕</div>
            <h1 className="text-4xl font-bold text-center text-gray-900">
              Join <span className="text-yellow-500">PizzaHub</span>
            </h1>
            <p className="text-gray-600 text-center text-lg">
              Sign up now and get exclusive deals on delicious pizzas delivered
              to your doorstep
            </p>
            <div className="space-y-4 mt-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                  ✓
                </div>
                <p className="text-gray-700 font-medium">
                  Fresh & Handcrafted Pizzas
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                  ✓
                </div>
                <p className="text-gray-700 font-medium">Fast Delivery</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                  ✓
                </div>
                <p className="text-gray-700 font-medium">
                  Special Discounts & Offers
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-yellow-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                {" "}
                Create Account
              </h2>
              <p className="text-gray-600 mt-2">Join our pizza family today</p>
            </div>

            <SignupForm />

            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-yellow-600 font-bold hover:text-yellow-700"
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
