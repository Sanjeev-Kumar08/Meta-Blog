"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setUserOTP } from "@/app/store/forgotPasswordSlice";
import Loader from "@/app/components/Loader/Loader";

export default function OtpVerificationPage({ goToGeneratePasswordPage }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const [enteredInvalidOtp, setEnteredInvalidOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const userEmail = useSelector((state) => state.forgotPassword.email);

  const handleOTPSubmission = async (e) => {
    e.preventDefault();
    console.log("OTP::", otp);
    dispatch(setUserOTP(otp));
    console.log("emailFROMRedux", userEmail);

    try {
      setIsLoading(true);
      const response = await fetch(
        "https://tunica-blogs-backend.onrender.com/api/forgetpassword/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: userEmail,
            otp: otp,
          }),
        }
      );

      // Handle API Response
      const data = await response.json();
      console.log("OTP", otp);
      console.log("Response After Entering OTP::", response);
      console.log("Data After Entering OTP::", data);
      if (response.ok) {
        if (data.success) {
          setIsLoading(false);
          router.push("/generate-new-password");
          goToGeneratePasswordPage();
        }
      } else {
        setIsLoading(false);
        setEnteredInvalidOtp(true);
      }
    } catch (error) {
      console.error("ERROR:", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg font-worksans">
        <h2 className="text-2xl font-semibold text-center text-boldTextcolor mb-6">
          Enter security code
        </h2>

        <form className="flex flex-col gap-y-6" onSubmit={handleOTPSubmission}>
          <p className="text-[18px] text-black">
            Please check your emails for a message with your code. Your code is
            6 numbers long.
          </p>

          {/* Password must be atleast 6 characters */}
          {enteredInvalidOtp ? (
            <div
              className="flex items-center justify-between gap-2 font-worksans p-3 text-sm text-red-800 bg-red-100 border border-red-300 rounded-lg"
              role="alert"
            >
              <p>Invalid OTP</p>
            </div>
          ) : null}

          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Enter OTP
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="One-Time Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
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
      </div>
    </div>
  );
}
