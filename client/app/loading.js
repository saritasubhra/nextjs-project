import { LoaderCircle } from "lucide-react";
import React from "react";

export default function loading() {
  return (
    <div className="grid justify-center items-center h-screen">
      <span className="animate-spin">
        <LoaderCircle size={30} />
      </span>
    </div>
  );
}
