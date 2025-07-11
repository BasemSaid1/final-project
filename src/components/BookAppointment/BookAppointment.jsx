import React, { useState } from "react";
import toast from "react-hot-toast";

export default function BookAppointment() {
  const [selectedDate, setSelectedDate] = useState("2025-07-15");
  const [selectedTime, setSelectedTime] = useState("");

  const times = ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM"];

  const handleBooking = () => {
    if (!selectedTime) {
      toast.error("Please select a time slot");
      return;
    }
    toast.success(`Appointment booked on ${selectedDate} at ${selectedTime}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md border border-teal-500">
        <div className="flex justify-between items-center mb-4">
          <button className="text-teal-500 hover:text-teal-700">←</button>
          <h2 className="text-lg font-semibold text-gray-700">July 2025</h2>
          <button className="text-teal-500 hover:text-teal-700">→</button>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center mb-6 text-gray-700">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="font-semibold">
              {d}
            </div>
          ))}
          {Array.from({ length: 31 }, (_, i) => {
            const day = i + 1;
            const date = `2025-07-${day.toString().padStart(2, "0")}`;
            return (
              <button
                key={day}
                onClick={() => setSelectedDate(date)}
                className={`py-1 rounded ${
                  selectedDate === date
                    ? "bg-teal-500 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>

        <h3 className="text-center text-lg font-bold text-gray-800 mb-4">
          Available Time Slot
        </h3>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {times.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`px-4 py-2 border rounded-full transition ${
                selectedTime === time
                  ? "bg-teal-500 text-white border-teal-500"
                  : "border-teal-500 text-teal-500 hover:bg-teal-50"
              }`}
            >
              {time}
            </button>
          ))}
        </div>

        <button
          onClick={handleBooking}
          className="w-full py-3 bg-teal-500 text-white font-semibold rounded-full hover:bg-teal-600 transition"
        >
          Make an appointment
        </button>
      </div>
    </div>
  );
}
