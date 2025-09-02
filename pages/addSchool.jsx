"use client";
import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import Navbar from "./Navbar";


export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [message, setMessage] = useState("");
  const submitBtnRef = useRef(null); // ✅ reference for submit button

  // ✅ Focus submit button when form loads
  useEffect(() => {
    if (submitBtnRef.current) {
      submitBtnRef.current.focus();
    }
  }, []);

  const onSubmit = async (data) => {
    const file = data.image[0]; // FileList → pick first file
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64 = reader.result.split(",")[1]; // fix: always take index 1
      const res = await fetch("/api/addSchool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          imageBase64: base64,
          imageName: file.name,
        }),
      });

      const result = await res.json();
      setMessage(result.message || result.error);

      // ✅ Reset form after successful submission
      if (res.ok) {
        reset();
      }

      // ✅ Auto-hide message after 3 seconds
      setTimeout(() => {
        setMessage("");
      }, 3000);
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
    <Navbar />
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      
      {/* Image Section */}
      <div className="hidden md:flex md:w-1/2 h-full items-center justify-center px-8 py-16">
        <img
          src="/schoolImages/registration.png"  // ✅ fixed path
          alt="School Promotion"
          className="rounded-2xl shadow-xl w-full h-auto object-cover max-h-[450px] transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Form Section */}
      <div className="md:w-1/2 w-full flex items-center justify-center px-4 py-8">
        <div className="p-8 w-full max-w-lg bg-white rounded-2xl shadow-lg">
          
          {/* ✅ Message at top */}
          {message && (
            <p className="mb-4 text-center text-green-500 font-semibold">
              {message}
            </p>
          )}

          <h1 className="text-4xl font-extrabold text-center text-indigo-900 mb-4 drop-shadow-lg">Add School</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              {...register("name", { required: true })}
              placeholder="School Name"
              className={`border p-3 rounded w-full focus:ring-2 focus:ring-blue-400 ${errors.name ? "border-red-500" : ""}`}
            />
            {errors.name && <span className="text-red-500 text-sm">Name required</span>}

            <input {...register("address", { required: true })} placeholder="Address" className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-400" />
            <input {...register("city", { required: true })} placeholder="City" className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-400" />
            <input {...register("state", { required: true })} placeholder="State" className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-400" />
            <input type="number" {...register("contact", { required: true })} placeholder="Contact" className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-400" />
            <input type="email" {...register("email_id", { required: true })} placeholder="Email" className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-400" />
            
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: true })}
              className="border p-3 rounded w-full file:border-none file:bg-gray-200"
            />

            <button
              type="submit"
              ref={submitBtnRef} 
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#0070f3",
                color: "white",
                border: "none",
                borderRadius: "5px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer", // 👈 Hand pointer on hover
              }}
              className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded w-full mt-2 shadow-sm"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
