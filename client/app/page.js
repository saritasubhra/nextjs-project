import React from "react";
import Image from "next/image";
import axiosInstance from "@/lib/axios";
import Link from "next/link";

async function Home() {
  const res = await axiosInstance.get("/pizzas");
  const pizzas = res.data.data;

  return (
    <div className="max-w-5xl 2xl:max-w-6xl mx-auto px-2 py-12">
      {/* Hero Section */}
      <section className="relative px-12 pb-10 flex flex-col items-center text-center">
        <h1 className="text-6xl md:text-8xl font-bold mb-4">
          Delight in <br />
          <span className="text-[#FACC15]">every bite!</span>
        </h1>

        <p className="max-w-md text-gray-600 mb-8">
          Experience the joy of perfectly baked pizzas, made with love and
          crafted to bring a smile to every celebration.
        </p>

        <button className="bg-[#FACC15] text-black px-8 py-3 rounded-full font-bold shadow-lg hover:bg-[#EAB308] transition">
          SHOP NOW
        </button>
      </section>

      {pizzas.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-2xl text-yellow-700 font-semibold">
            No pizzas available at the moment.
          </p>
          <p className="text-gray-500 mt-2">Check back soon!</p>
        </div>
      ) : (
        <>
          {/* <p className="text-center text-gray-600 mb-10 text-lg">
            Choose from {pizzas.length} delicious options
          </p> */}

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {pizzas.map((pizza) => (
              <div
                key={pizza._id}
                className="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="relative w-full h-56 bg-gray-100 overflow-hidden">
                  <Image
                    src={`${pizza.image}`}
                    alt={pizza.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Content Container */}
                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 transition-colors">
                    {pizza.name}
                  </h2>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
                    {pizza.ingredients.join(", ")}
                  </p>

                  {/* Price and Button */}
                  <div className="flex items-center justify-between pt-3 border-t border-yellow-100">
                    <span className="text-2xl font-bold text-yellow-600">
                      ₹{pizza.price}
                    </span>
                    <Link href={`/pizza/${pizza._id}`}>
                      <button className="bg-linear-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-semibold py-2 px-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
                        See Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
