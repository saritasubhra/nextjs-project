import Link from "next/link";
import BackButton from "./BackButton";

function EmptyCart() {
  return (
    <main className="min-h-screen bg-linear-to-b from-yellow-50 to-white">
      <BackButton />

      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-7xl mb-6">🛒</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Your cart is empty
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Add some delicious pizzas to get started!
        </p>
        <Link
          href="/"
          className="inline-block bg-linear-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}

export default EmptyCart;
