import React from "react";
import contactImg from "../../assets/contact.png";
import toast from "react-hot-toast";

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully! ✅");
  };

  return (
    <div className="w-[80%] mx-auto flex flex-col md:flex-row items-center justify-between min-h-screen p-8">
      <div className="w-full md:w-1/2 space-y-4">
        <h2 className="font-bold text-2xl text-center my-4 text-blue-500 mt-20">
          We're Here to <span className="text-blue-500">Help!</span>
        </h2>
        <div className="w-full md:w-[80%] mx-auto">
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="relative z-0 w-full my-3 group">
              <label htmlFor="name" className="block text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-2 border-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                placeholder=""
                required
              />
            </div>
            <div className="relative z-0 w-full my-3 group">
              <label htmlFor="email" className="block text-gray-700">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                placeholder=""
                required
              />
            </div>
            <div className="relative z-0 w-full my-3 group">
              <label htmlFor="message" className="block text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full p-2 border-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                placeholder=""
                required
              ></textarea>
            </div>
            <div className="text-left">
              <button
                type="submit"
                className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none 
                focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center hover:scale-105 transform transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>
          <p className="text-gray-700 mt-4">
            <span className="text-blue-500"> Our Contact Information:</span>
            <br />
            Phone: <span className="text-blue-500">+20 (XXX) XXX-XXXX</span>
            <br />
            Available: Mon-Fri, 9:00 AM - 5:00 PM <br />
            Email:
            <span className="text-blue-500">support@yourclinicname.com </span>
            <br />(
            <span className="text-blue-500">We respond within 24 hours</span>)
          </p>
        </div>
      </div>

      <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
        <img
          src={contactImg}
          alt="contactImg"
          className="rounded-lg shadow-md h-120"
        />
      </div>
    </div>
  );
}
