// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import doctorImg from "../../assets/doctor.png";
// import toast from "react-hot-toast";

// export default function FindDoctor() {
//   const navigate = useNavigate();
//   const [specialties, setSpecialties] = useState([]);
//   const [doctors, setDoctors] = useState([]);
//   const [selectedSpecialty, setSelectedSpecialty] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     axios
//       .get("https://myclinicproj.runasp.net/api/Specialty")
//       .then((res) => {
//         setSpecialties(res.data);
//       })
//       .catch((err) => {
//         toast.error("Failed to bring Specialties. Try again.");
//       });
//   }, []);

//   const handleSearch = () => {
//     if (!selectedSpecialty) {
//       toast.error("Please choose a Specialties");
//       return;
//     }
//     setLoading(true);
//     setError("");
//     axios
//       .get("https://myclinicproj.runasp.net/api/Doctor")
//       .then((res) => {
//         console.log("Doctors:", res.data);
//         const filteredDoctors = res.data.filter(
//           (doctor) => doctor.specialtyId === parseInt(selectedSpecialty)
//         );
//         setDoctors(filteredDoctors);
//         setLoading(false);
//         if (filteredDoctors.length === 0) {
//           setError("No doctors found in this specialty.");
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching doctors:", err);
//         setError("Failed to retrieve doctors' data. Try again.");
//         setLoading(false);
//       });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center py-6 px-4">
//       <h2 className="text-3xl font-bold text-emerald-700 my-6">
//         Find a doctor
//       </h2>

//       <div className="w-full max-w-md mb-8">
//         <div className="flex flex-col md:flex-row gap-4">
//           <select
//             value={selectedSpecialty}
//             onChange={(e) => setSelectedSpecialty(e.target.value)}
//             className="w-full md:w-2/3 p-2 border-2 rounded focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
//           >
//             <option value="" disabled>
//               Choose your specialty
//             </option>
//             {specialties.map((specialty) => (
//               <option key={specialty.id} value={specialty.id}>
//                 {specialty.specialtyName}
//               </option>
//             ))}
//           </select>
//           <button
//             onClick={handleSearch}
//             disabled={loading}
//             className="bg-emerald-700 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-emerald-800 transition transform hover:scale-105 disabled:opacity-50"
//           >
//             {loading ? <i className="fas fa-spinner fa-spin"></i> : "Research"}
//           </button>
//         </div>
//       </div>

//       {loading && (
//         <p className="text-emerald-700 text-xl font-semibold animate-pulse">
//           Loading doctors...
//         </p>
//       )}

//       {error && <p className="text-red-600 text-xl font-semibold">{error}</p>}

//       <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
//         {doctors.map((doctor) => (
//           <div
//             key={doctor.id}
//             className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4 hover:shadow-lg transition cursor-pointer"
//             onClick={() => navigate(`/doctorProfile/${doctor.id}`)}
//           >
//             <img
//               src={doctorImg}
//               alt={doctor.firstName}
//               className="w-24 h-24 rounded-full object-cover"
//             />
//             <div>
//               <h3 className="text-xl font-semibold text-gray-700">
//                 Dr. {doctor.firstName} {doctor.lastName}
//               </h3>
//               <p className="text-gray-600">
//                 {doctor.specialtyName || "unavailable"}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import doctorImg from "../../assets/doctor.png";
import toast from "react-hot-toast";

export default function FindDoctor() {
  const navigate = useNavigate();
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch specialties and all doctors on component mount
  useEffect(() => {
    // Fetch specialties
    axios
      .get("https://myclinicproj.runasp.net/api/Specialty")
      .then((res) => {
        setSpecialties(res.data);
      })
      .catch((err) => {
        console.error("Error fetching specialties:", err);
        toast.error("Failed to fetch specialties. Please try again.");
      });

    // Fetch all doctors
    setLoading(true);
    axios
      .get("https://myclinicproj.runasp.net/api/Doctor")
      .then((res) => {
        setDoctors(res.data);
        setFilteredDoctors(res.data); // Initially display all doctors
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching doctors:", err);
        setError("Failed to retrieve doctors' data. Please try again.");
        setLoading(false);
        toast.error("Failed to retrieve doctors' data. Please try again.");
      });
  }, []);

  const handleSearch = () => {
    if (!selectedSpecialty) {
      toast.error("Please select a specialty");
      setFilteredDoctors(doctors); // Reset to all doctors if no specialty selected
      setError("");
      return;
    }
    setLoading(true);
    setError("");
    // Try fetching filtered doctors from backend
    axios
      .get(
        `https://myclinicproj.runasp.net/api/Doctor/specialty/${selectedSpecialty}`
      )
      .then((res) => {
        setFilteredDoctors(res.data);
        setLoading(false);
        if (res.data.length === 0) {
          setError("No doctors found in this specialty.");
        }
      })
      .catch((err) => {
        console.error("Error fetching filtered doctors:", err);
        // Fallback to frontend filtering if backend endpoint fails
        const filtered = doctors.filter(
          (doctor) => doctor.specialtyId === parseInt(selectedSpecialty)
        );
        setFilteredDoctors(filtered);
        setLoading(false);
        if (filtered.length === 0) {
          setError("No doctors found in this specialty.");
        } else {
          setError("");
        }
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-6 px-4">
      <h2 className="text-3xl font-bold text-[#0a95c0] my-6">Find a Doctor</h2>

      <div className="w-full max-w-md mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="w-full md:w-2/3 p-2 border-2 rounded focus:ring-2 focus:ring-[#0a95c0] focus:border-[#0a95c0]"
          >
            <option value="" disabled>
              Select a specialty
            </option>
            <option value="">All Specialties</option>
            {specialties.map((specialty) => (
              <option key={specialty.id} value={specialty.id}>
                {specialty.specialtyName}
              </option>
            ))}
          </select>
          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-[#0a95c0] cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-[#087f9e] transition transform hover:scale-105 disabled:opacity-50"
          >
            {loading ? <i className="fas fa-spinner fa-spin"></i> : "Search"}
          </button>
        </div>
      </div>

      {loading && (
        <p className="text-[#0a95c0] text-xl font-semibold animate-pulse">
          Loading doctors...
        </p>
      )}

      {error && <p className="text-red-600 text-xl font-semibold">{error}</p>}

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4 hover:shadow-lg transition cursor-pointer"
            onClick={() => navigate(`/doctorProfile/${doctor.id}`)}
          >
            <img
              src={doctorImg}
              alt={`${doctor.firstName} ${doctor.lastName}`}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-700">
                Dr. {doctor.firstName} {doctor.lastName}
              </h3>
              <p className="text-gray-600">
                {doctor.specialtyName || "Specialty unavailable"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
