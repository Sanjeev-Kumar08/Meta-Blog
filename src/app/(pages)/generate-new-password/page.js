"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function GenerateNewPasswordPage({ goToLogInPage }) {
    const router = useRouter();
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [redirect, setredirect] = useState(false);
  const [isPasswordSame, setIsPasswordSame] = useState(true);

  const handleFormSubmmission = async (e) => {
    e.preventDefault();
    console.log("newPassword1", newPassword1);
    console.log("newPassword2", newPassword2);

    if (newPassword1 === newPassword2) {
        setIsPasswordSame(true);
      //   try {
      //     const response = await fetch("/api/generate-otp", {
      //       method: "POST",
      //       credentials: "include",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: { otp },
      //     });
      //     // Handle API Response
      //     if (response.ok) {
      //       const data = await response.json();
      //       if (data.message === "Password Changed Successully") {
      //         setIsOtpVerified(true);
      //       }
      //     }
      //   } catch (error) {
      //     console.error("ERROR:", error.message);
      //   } finally {
      //     if (isOtpVerified) {
      //       router.push("/login");
      //       goToLogInPage();
      //     }
      //   }
      console.log("Password Changed Successully. PLease try Sign In");
      setredirect(true);
      console.log("Redirecting to Login in 5 seconds");
      setTimeout(() => {
        router.push("/login");
        goToLogInPage();
        setredirect(false);
      }, 5000);
    } else {
        setIsPasswordSame(false);
      console.log("Password does not match");
    }
  };
  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg font-worksans">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Generate New Password.
        </h2>

        <form
          className="flex flex-col gap-y-6"
          onSubmit={handleFormSubmmission}
        >
            {/* Redirect */}
            {redirect ? (
              <div
                className="flex items-center justify-between gap-2 font-worksans p-3 text-sm text-green-800 bg-green-100 border border-green-300 rounded-lg"
                role="alert"
              >
                <p>Redirecting to Login in 5 seconds.</p>
              </div>
            ) : null}

            {/* Password do not match */}
            {!isPasswordSame ? (
              <div
                className="flex items-center justify-between gap-2 font-worksans p-3 text-sm text-red-800 bg-red-100 border border-red-300 rounded-lg"
                role="alert"
              >
                <p>Password do not match</p>
              </div>
            ) : null}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Enter New Password
            </label>
            <input
              type="text"
              id="password"
              value={newPassword1}
              onChange={(e) => setNewPassword1(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Re-Enter New Password
            </label>
            <input
              type="text"
              id="password"
              value={newPassword2}
              onChange={(e) => setNewPassword2(e.target.value)}
              placeholder="Password"
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
