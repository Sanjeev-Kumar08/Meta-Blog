"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function OtpVerificationPage({ goToGeneratePasswordPage }) {
    const router = useRouter();
    const [otp, setOtp] = useState("");
    const [isOtpVerified, setIsOtpVerified] = useState(false);

    const handleOTPSubmission = async (e) => {
        e.preventDefault();
        // try {
        //     const response = await fetch("/api/verify-otp", {
        //         method: 'POST',
        //         credentials: 'include',
        //         headers: {
        //             "Content-Type" : 'application/json'
        //         },
        //         body: {otp}
        //     })

        //     // Handle API Response
        //     if(response.ok){
        //         const data = await response.json();
        //         if(data.message === "OTP Verified"){
        //             setIsOtpVerified(true);
        //         }
        //     }
        // } catch (error) {
        //     console.error("ERROR:", error.message)
        // }
        // finally{
        //     if(isOtpVerified){
        //         router.push("/generate-new-password")
        //         goToGeneratePasswordPage();
        //     }
        // }
        router.push("/generate-new-password")
        goToGeneratePasswordPage();
    }
  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg font-worksans">
        <h2 className="text-2xl font-semibold text-center text-boldTextcolor mb-6">
            Enter security code
        </h2>

        <form className="flex flex-col gap-y-6" onSubmit={handleOTPSubmission}>
            <p className="text-[18px] text-black">
                Please check your emails for a message with your code. Your code is 6 numbers long.
            </p>
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
              placeholder="One-Time Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
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
      </div>
    </div>
  );
}
