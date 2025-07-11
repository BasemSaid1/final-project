import React from "react";
import { Link } from "react-router-dom";

export default function Notfound() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 px-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Sorry Page Not Found
      </h1>
      <p className="text-lg text-gray-600 mb-6 text-center">
        If this is a mistake, let us know, and we will try to fix it!
      </p>
    </div>
  );
}
