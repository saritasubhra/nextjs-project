"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddToCartSection({ pizza }) {
  const { addOrUpdateCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  return (
    <div className="space-y-4 pt-8 border-t-2 border-yellow-200">
      <div className="flex items-center space-x-4 bg-gray-100 rounded-xl p-2 w-fit">
        <button
          disabled={quantity === 1}
          onClick={() => setQuantity((prev) => prev - 1)}
          className="bg-white disabled:opacity-30 hover:bg-yellow-50 text-gray-900 font-bold px-4 py-2 rounded-lg transition"
        >
          −
        </button>
        <span className="text-gray-900 font-bold text-lg px-4">{quantity}</span>
        <button
          onClick={() => setQuantity((prev) => prev + 1)}
          className="bg-white hover:bg-yellow-50 text-gray-900 font-bold px-4 py-2 rounded-lg transition"
        >
          +
        </button>
      </div>

      <button
        onClick={() => {
          addOrUpdateCart(pizza?._id, quantity);
          router.push("/cart");
        }}
        className="w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 bg-linear-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white"
      >
        Add to Cart
      </button>

      <button className="w-full py-4 rounded-xl font-bold text-lg border-2 border-yellow-400 text-yellow-600 hover:bg-yellow-50 transition">
        Add to Favorites
      </button>
    </div>
  );
}
