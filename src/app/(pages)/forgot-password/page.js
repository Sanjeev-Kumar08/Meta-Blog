"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUserEmail } from "@/app/store/forgotPasswordSlice";
import Loader from "@/app/components/Loader/Loader";

export default function ForgotPasswordPage({
  onLogInClick,
  goToOtpVerificationPage,
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    dispatch(setUserEmail(email));
    
    try {
      setIsLoading(true);
      console.log("Reset Your Password Form is Submitted");
      const response = await fetch(
        "https://tunica-blogs-backend.onrender.com/api/forgetpassword/generate-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email }),
        }
      );
      // Handle response
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data.success) {
          setIsLoading(false);
          router.push("/otp-verification");
          goToOtpVerificationPage();
        } else {
          console.log("ERROR:::", "OTP NOT SENT");
        }
      }
    } catch (error) {
      console.error("Request failed:", error);
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>
          <div className="mt-1">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue hover:bg-blue rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {isLoading ? (
                <Loader source="forgotPassword" className="h-6 w-6" />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
        <div className="mt-6 flex justify-end">
          <p
            className="font-Roboto text-boldTextcolor hover:text-blue hover:underline cursor-pointer"
            onClick={() => onLogInClick()}
          >
            Go to Login
          </p>
        </div>
      </div>
    </div>
  );
}
