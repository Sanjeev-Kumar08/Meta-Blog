"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Loader from "@/app/components/Loader/Loader";

export default function GenerateNewPasswordPage({ goToLogInPage }) {
  const router = useRouter();
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [redirect, setredirect] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [isPasswordSame, setIsPasswordSame] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const userEmail = useSelector((state) => state.forgotPassword.email);
  const userOTP = useSelector((state) => state.forgotPassword.otp);

  const handleFormSubmmission = async (e) => {
    e.preventDefault();

    if (newPassword1.length < 6) setInvalidPassword(true);
    setTimeout(() => {
      setInvalidPassword(false);
    }, 5000);
    if (newPassword1 !== newPassword2) setIsPasswordSame(false);
    setTimeout(() => {
      setIsPasswordSame(true);
    }, 5000);

    if (newPassword1 === newPassword2 && newPassword1.length >= 6) {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://tunica-blogs-backend.onrender.com/api/forgetpassword/change-password",
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: userEmail,
              otp: userOTP,
              password: newPassword1,
            }),
          }
        );
        // Handle API Response
        const data = await response.json();
        if (response.ok) {
          if (data.success) {
            setIsLoading(false);
            setredirect(true);
            setInvalidPassword(false);
            setIsPasswordSame(true);
            setNewPassword1("");
            setNewPassword2("");

            setTimeout(() => {
              router.push("/login");
              goToLogInPage();
              setredirect(false);
            }, 5000);
          }
        }
      } catch (error) {
        console.error("ERROR:", error.message);
      }
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
              className="flex flex-col items-center justify-between gap-2 font-worksans p-3 text-sm text-green-800 bg-green-100 border border-green-300 rounded-lg w-full"
              role="alert"
            >
              <p className="border-b border-green-800">
                Password Changed Successully. PLease try Sign In
              </p>
              <p className="text-boldTextcolor">Redirecting to Login in 5 seconds.</p>
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

          {/* Password must be atleast 6 characters */}
          {invalidPassword ? (
            <div
              className="flex items-center justify-between gap-2 font-worksans p-3 text-sm text-red-800 bg-red-100 border border-red-300 rounded-lg"
              role="alert"
            >
              <p>Password must be atleast 6 characters</p>
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
