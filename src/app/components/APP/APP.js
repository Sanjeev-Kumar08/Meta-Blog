"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import LogInPage from "@/app/(pages)/login/page";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import SignUpPage from "@/app/(pages)/signup/page";
import { logOut } from "@/app/store/authSlice";
import Loader from "../Loader/Loader";
import Cookies from "js-cookie";
import ForgotPasswordPage from "@/app/(pages)/forgot-password/page";
import OtpVerificationPage from "@/app/(pages)/otp-verification/page";
import GenerateNewPasswordPage from "@/app/(pages)/generate-new-password/page";

function APP({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [activePage, setActivePage] = useState(null);
  const userLogInStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get("authToken");

      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        router.push("/login");
      }
      setIsAuthenticating(false);
    };

    checkAuth();
  }, [userLogInStatus]);

  const handleSignOut = () => {
    console.log("SignOut Clicked");
    Cookies.remove("authToken");
    dispatch(logOut());
    setIsLoggedIn(false);
    router.push("/login");
  };

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  if (isAuthenticating) {
    return <Loader />;
  }

  return (
    <>
      <Navbar onSignOut={handleSignOut} />
      {isLoggedIn ? (
        <>
          {children}
          <Footer />
        </>
      ) : activePage === "login" ? (
        <LogInPage
          onSignUpClick={() => handlePageChange("signup")}
          onForgotPasswordClick={() => handlePageChange("forgot-password")}
        />
      ) : activePage === "signup" ? (
        <SignUpPage
          onLoginClick={() => setActivePage("login")}
          onForgotPasswordClick={() => handlePageChange("forgot-password")}
        />
      ) : activePage === "forgot-password" ? (
        <ForgotPasswordPage
          onLogInClick={() => setActivePage("login")}
          goToOtpVerificationPage={() => setActivePage("otp-verification")}
        />
      ) : activePage === "otp-verification" ? (
        <OtpVerificationPage
          goToGeneratePasswordPage={() =>
            setActivePage("generate-new-password")
          }
        />
      ) : activePage === "generate-new-password" ? (
        <GenerateNewPasswordPage goToLogInPage={() => setActivePage("login")} />
      ) : (
        <LogInPage
          onSignUpClick={() => handlePageChange("signup")}
          onForgotPasswordClick={() => handlePageChange("forgot-password")}
        />
      )}
    </>
  );
}

export default APP;
