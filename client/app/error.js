"use client";

import Link from "next/link";

export default function Error({ error }) {
  return (
    <main className="flex justify-center items-center flex-col gap-6 pt-16">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <Link href="/" type="green">
        Go Back
      </Link>
    </main>
  );
}

//error.js must be a client component
