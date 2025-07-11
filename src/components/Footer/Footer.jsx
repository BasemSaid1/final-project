import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="text-white bg-[#0a95c0]  py-8 ">
        <div className="container mx-auto px-6">
          <div className=" mt-2 pt-4 text-center text-sm">
            <p>All rights reserved &copy; {new Date().getFullYear()}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
