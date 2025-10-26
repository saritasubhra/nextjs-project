import Image from "next/image";
import axiosInstance from "@/lib/axios";
import BackButton from "@/app/_components/BackButton";

async function Pizza({ params }) {
  const { pizzaId } = await params;

  const res = await axiosInstance.get(`/pizzas/${pizzaId}`);
  const pizza = res.data.data;

  return (
    <main className="min-h-screen bg-linear-to-b from-yellow-50 to-white">
      <BackButton />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="flex flex-col space-y-4">
            <div className="relative w-full h-72 md:h-80 bg-gray-100 rounded-2xl overflow-hidden shadow-lg border-2 border-yellow-200">
              <Image
                src={`http://localhost:8000${pizza.image}`}
                alt={pizza.name}
                fill
                className="object-cover hover:scale-110 transition-transform duration-300"
                priority
              />
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-8">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-center">
                <p className="text-blue-900 font-semibold text-sm">🚚</p>
                <p className="text-blue-900 font-bold text-sm mt-2">
                  Free Delivery
                </p>
              </div>
              <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4 text-center">
                <p className="text-purple-900 font-semibold text-sm">⏱️</p>
                <p className="text-purple-900 font-bold text-sm mt-2">
                  30 mins delivery
                </p>
              </div>
              <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4 text-center">
                <p className="text-orange-900 font-semibold text-sm">⭐</p>
                <p className="text-orange-900 font-bold text-sm mt-2">
                  Customer Favorite
                </p>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col space-y-8">
            {/* Title and Price */}
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {pizza.name}
              </h1>
              <div className="flex items-end space-x-2">
                <span className="text-3xl font-bold text-yellow-600">
                  ₹{pizza.price}
                </span>
                <span className="text-gray-500 text-sm line-through">
                  ₹{Math.round(pizza.price * 1.3)}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2 border-b-2 border-yellow-200 pb-6">
              <h2 className="text-lg font-bold text-gray-900">Description</h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                {pizza.description}
              </p>
            </div>

            {/* Ingredients */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900">Ingredients</h2>
              <div className="grid grid-cols-2 gap-2">
                {pizza.ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-2 flex items-center space-x-2 hover:bg-yellow-100 transition"
                  >
                    <span className="text-lg">✓</span>
                    <span className="text-gray-800 text-sm font-medium">
                      {ingredient}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Add to Cart Section */}
            <div className="space-y-4 pt-8 border-t-2 border-yellow-200">
              <div className="flex items-center space-x-4 bg-gray-100 rounded-xl p-2 w-fit">
                <button className="bg-white hover:bg-yellow-50 text-gray-900 font-bold px-4 py-2 rounded-lg transition">
                  −
                </button>
                <span className="text-gray-900 font-bold text-lg px-4">1</span>
                <button className="bg-white hover:bg-yellow-50 text-gray-900 font-bold px-4 py-2 rounded-lg transition">
                  +
                </button>
              </div>

              <button
                disabled={!pizza.isAvailable}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  pizza.isAvailable
                    ? "bg-linear-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                {pizza.isAvailable ? " Add to Cart" : "Out of Stock"}
              </button>

              <button className="w-full py-4 rounded-xl font-bold text-lg border-2 border-yellow-400 text-yellow-600 hover:bg-yellow-50 transition">
                Add to Favorites
              </button>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {/* <div className="mt-20 pt-12 border-t-4 border-yellow-200">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            More From Our Menu
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl border-2 border-yellow-100 overflow-hidden transition transform hover:-translate-y-1 group cursor-pointer"
              >
                <div className="relative w-full h-40 bg-gray-200">
                  <span className="text-6xl flex items-center justify-center h-full group-hover:scale-110 transition-transform">
                    🍕
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900">Pizza Name</h3>
                  <p className="text-yellow-600 font-bold mt-2">₹499</p>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </main>
  );
}

export default Pizza;
