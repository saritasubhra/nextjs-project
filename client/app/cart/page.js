"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import BackButton from "../_components/BackButton";

export default function CartPage() {
  const { cart, removeCartItem, addOrUpdateCart, subtotal } = useCart();

  const router = useRouter();

  const deliveryFee = subtotal > 300 ? 0 : 40;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + tax;

  if (cart.length === 0) {
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

  return (
    <main className="min-h-screen bg-linear-to-b from-yellow-50 to-white">
      <BackButton />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">🛒 Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.pizzaId._id}
                className="bg-white rounded-2xl border-2 border-yellow-100 p-4 shadow-md hover:shadow-lg transition"
              >
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={`http://localhost:8000${item.pizzaId.image}`}
                      alt={item.pizzaId.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="grow">
                    <h3 className="text-lg font-bold text-gray-900">
                      {item.pizzaId.name}
                    </h3>
                    <p className="text-yellow-600 font-bold text-lg">
                      ₹{item.pizzaId.price}
                    </p>
                  </div>

                  {/* Quantity & Remove */}
                  <div className="flex flex-col items-end justify-between">
                    {/* Quantity Selector */}
                    <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => addOrUpdateCart(item.pizzaId._id, -1)}
                        className="text-gray-900 font-bold px-2 py-1 hover:bg-yellow-100 rounded transition"
                      >
                        −
                      </button>
                      <span className="text-gray-900 font-bold px-3">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => addOrUpdateCart(item.pizzaId._id, 1)}
                        className="text-gray-900 font-bold px-2 py-1 hover:bg-yellow-100 rounded transition"
                      >
                        +
                      </button>
                    </div>

                    {/* Price & Remove */}
                    <div className="text-right">
                      <p className="text-gray-600 text-sm">
                        Subtotal:{" "}
                        <span className="font-bold text-gray-900">
                          ₹{item.pizzaId.price * item.quantity}
                        </span>
                      </p>
                      <button
                        onClick={() => removeCartItem(item.pizzaId._id)}
                        className="text-red-600 hover:text-red-700 font-semibold text-sm mt-1 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border-2 border-yellow-200 p-6 shadow-lg sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Tax (5%)</span>
                  <span className="font-semibold">₹{tax}</span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span className="flex items-center space-x-2">
                    <span>Delivery</span>
                    {deliveryFee === 0 && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">
                        FREE
                      </span>
                    )}
                  </span>
                  <span className="font-semibold">
                    {deliveryFee === 0 ? "✓" : `₹${deliveryFee}`}
                  </span>
                </div>

                {deliveryFee > 0 && (
                  <p className="text-xs text-gray-500 bg-yellow-50 p-2 rounded">
                    Free delivery on orders above ₹300
                  </p>
                )}
              </div>

              <div className="border-t-2 border-yellow-100 pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-yellow-600">
                    ₹{total}
                  </span>
                </div>
              </div>

              <button className="w-full bg-linear-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Proceed to Buy
              </button>

              <button
                onClick={() => router.push("/")}
                className="w-full mt-3 border-2 border-yellow-300 hover:border-yellow-400 text-gray-900 font-bold py-3 rounded-lg transition-all duration-300 hover:bg-yellow-50"
              >
                Continue Shopping
              </button>

              {/* Promo Code */}
              {/* <div className="mt-6 pt-6 border-t-2 border-yellow-100">
                <label className="block text-gray-700 font-semibold text-sm mb-2">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-grow px-3 py-2 border-2 border-yellow-200 rounded-lg focus:outline-none focus:border-yellow-400 text-sm"
                  />
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold px-4 py-2 rounded-lg transition">
                    Apply
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-center">
            <p className="text-2xl mb-2">🚚</p>
            <p className="text-blue-900 font-bold text-sm">Fast Delivery</p>
            <p className="text-blue-700 text-xs mt-1">30 mins or less</p>
          </div>
          <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4 text-center">
            <p className="text-2xl mb-2">💳</p>
            <p className="text-purple-900 font-bold text-sm">Safe Payment</p>
            <p className="text-purple-700 text-xs mt-1">Multiple options</p>
          </div>
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 text-center">
            <p className="text-2xl mb-2">📱</p>
            <p className="text-green-900 font-bold text-sm">Track Order</p>
            <p className="text-green-700 text-xs mt-1">Real-time updates</p>
          </div>
        </div>
      </div>
    </main>
  );
}
