"use client";

import { useRouter } from "next/navigation";
import React from "react";

function BackButton() {
  const router = useRouter();
  return (
    <div className=" px-4 py-4">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => router.back()}
          className="text-black hover:text-yellow-900 font-semibold flex items-center space-x-2 transition"
        >
          <span>←</span>
          <span>Go Back</span>
        </button>
      </div>
    </div>
  );
}

export default BackButton;
