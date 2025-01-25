"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import LogInPage from "@/app/(pages)/login/page";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import SignUpPage from "@/app/(pages)/signup/page";
import { logOut } from "@/app/store/authSlice";
import { jwtDecode } from "jwt-decode";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Loader from "../Loader/Loader";
import Cookies from "js-cookie";
import ForgotPasswordPage from "@/app/(pages)/forgot-password/page";
import OtpVerificationPage from "@/app/(pages)/otp-verification/page";
import GenerateNewPasswordPage from "@/app/(pages)/generate-new-password/page";

function APP({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [activePage, setActivePage] = useState("/");
  const userLogInStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get("authToken");

      if (!token) {
        handleInvalidToken();
      } else {
        try {
          const decodedToken = jwtDecode(token);
          const expiryDate = new Date(decodedToken.exp * 1000);
          const currentDate = new Date();

          if (currentDate < expiryDate) {
            setIsLoggedIn(true); // Token is valid
          } else {
            handleInvalidToken(); // Token is expired
          }
        } catch (error) {
          console.error("Error decoding token:", error);
          handleInvalidToken();
        }
      }
      setIsAuthenticating(false);
    };

    checkAuth();
  }, [userLogInStatus]);

  const handleInvalidToken = () => {
    setIsLoggedIn(false);
    router.push("/login");
  };

  const handleSignOut = () => {
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
    <AnimatePresence mode="wait">
      <motion.div
        key={`${pathname}-${activePage}`} 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
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
          <GenerateNewPasswordPage
            goToLogInPage={() => setActivePage("login")}
          />
        ) : (
          <LogInPage
            onSignUpClick={() => handlePageChange("signup")}
            onForgotPasswordClick={() => handlePageChange("forgot-password")}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default APP;
