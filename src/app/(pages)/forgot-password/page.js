"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage({
  onLogInClick,
  goToOtpVerificationPage,
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isOtpRecieved, setIsOtpRecieved] = useState(false);
  const [OTP, setOTP] = useState(null);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://tunica-blogs-backend.onrender.com/api/forgetpassword/generate-otp",
        {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            // credentials: "include",
            body: JSON.stringify(email),
          }
      );
      // Handle response
      if (response.ok) {
          const data = await response.json();
          console.log(data);
        if (data.message == "OTP SENT SUCCESSFULLY") {
          setIsOtpRecieved(true);
        }
      }
    } catch (error) {
      console.error("ERROR:", error);
    } finally {
      if (isOtpRecieved) {
        goToOtpVerificationPage();
      }
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg font-worksans">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Reset Your Password.
        </h2>

        <form className="flex flex-col gap-y-6" onSubmit={handleEmailSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Enter your email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
            />
          </div>
          <div className="mt-1">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue hover:bg-blue rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Submit
            </button>
          </div>
        </form>
        <div className="mt-6 flex justify-end">
          <p
            className="font-Roboto hover:text-blue hover:underline cursor-pointer"
            onClick={() => onLogInClick()}
          >
            Go to Login
          </p>
        </div>
      </div>
    </div>
  );
}
