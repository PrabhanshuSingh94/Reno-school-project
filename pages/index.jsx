"use client";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function ShowSchools() {
  const [schools, setSchool] = useState([]);

  useEffect(() => {
    fetch("/api/getSchool")
      .then(res => res.json())
      .then(data => setSchool(data));
  }, []);

  return (
    <>
      <Navbar />
    <div className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 min-h-screen py-12 px-6 sm:px-10 lg:px-20">
      <h1 className="text-4xl font-extrabold text-center text-indigo-900 mb-14 drop-shadow-lg">
        Explore Schools
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {schools.map((school) => (
          <div
            key={school.id}
            className="bg-white rounded-3xl shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden transform hover:shadow-xl hover:-translate-y-0.5"
          >
            <div className="relative h-56 w-full overflow-hidden rounded-t-3xl">
              <img
                src={school.image}
                alt={school.name}
                className="object-cover w-full h-full filter brightness-95 hover:brightness-100 transition-all duration-500"
                loading="lazy"
              />
            </div>
            <div className="p-6 flex flex-col space-y-2">
              <h2
                className="text-xl font-semibold text-indigo-900 truncate"
                title={school.name}
              >
                {school.name}
              </h2>
              <p className="text-gray-700 text-sm truncate" title={school.address}>
                {school.address}
              </p>
              <p className="text-gray-500 text-xs uppercase tracking-wide">
                {school.city}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
