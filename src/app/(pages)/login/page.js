"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logIn } from "@/app/store/authSlice";
import Input from "../../components/Input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import SocialLoginAuthentication from "@/app/components/LogInButton/SocialLoginAuthentication";

export default function LogInPage({ onSignUpClick }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [invalidUser, setInvalidUser] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  const handleFormSubmmission = async (e) => {
    setIsLogging(true);
    e.preventDefault();

    if (password.length < 6) {
      setInvalidPassword(true);
      setIsLogging(false);
      setTimeout(() => {
        setInvalidPassword(false);
      }, 5000);
    } else {
      try {
        const response = await fetch(
          "https://tunica-blogs-backend.onrender.com/api/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          }
        );

        const data = await response.json();
        setIsLogging(false);
        setPassword("");
        setEmail("");

        // Validate Response from API
        if (!response.error && data.token) {
          setUser(data);
          dispatch(
            logIn({
              token: data.token,
              userFound: data.userFound,
            })
          );

          router.push("/");
        } else if (data.error) {
          setInvalidUser(true);
        } else {
          console.log("Error:", response.status);
        }
      } catch (error) {
        console.error("Request failed:", error);
      }
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <section className="sm426:h-[1076px] w-full my-5">
        <div className="flex justify-center items-center sm426:gap-x-4 sm426:flex-row flex-col gap-[27px]">
          {/* Form */}
          <div className="sm426:order-1 sm426:h-[1076px] sm426:w-[48%] flex flex-col justify-center items-center gap-[28px] sm426:relative order-2 w-full sm350:px-0 px-2">
            <div className="sm426:max-w-[388px] sm426:w-full flex flex-col justify-center items-center text-left break-words sm375:w-[360px] sm350:w-[320px] w-full">
              <p className="w-full font-semibold text-[36px] font-sfRounded">
                Welcome Back 👋
              </p>
              <p className="w-full font-sfDisplay text-left">
                Today is a new day. It's your day. You shape it.
              </p>
              <p className="w-full font-sfDisplay text-left">
                Sign in to start managing your projects.
              </p>
            </div>

            {/* INVALID CREDENTIALS MESSAGE */}
            {invalidUser ? (
              <div
                className="flex items-center justify-between gap-2 font-worksans p-3 text-sm text-red-800 bg-red-50 border border-red-300 rounded-lg"
                role="alert"
              >
                <FontAwesomeIcon icon={faCircleExclamation} />
                <p>Invalid email or password. Please try again.</p>
                <FontAwesomeIcon
                  icon={faXmark}
                  onClick={() => setInvalidUser(false)}
                  className="cursor-pointer mt-[1px]"
                />
              </div>
            ) : null}

            {/* SERVER ERROR */}
            {serverError ? (
              <div
                className="flex items-center justify-between gap-2 font-worksans p-3 text-sm text-red-800 bg-red-50 border border-red-300 rounded-lg"
                role="alert"
              >
                <p>Internal Sever Error. Try again after sometime.</p>
              </div>
            ) : null}

            {/* Invalid Password */}
            {invalidPassword ? (
              <div
                className="flex items-center justify-between gap-2 font-worksans p-3 text-sm text-red-800 bg-red-50 border border-red-300 rounded-lg"
                role="alert"
              >
                <FontAwesomeIcon icon={faCircleExclamation} />
                <p>Password must be of atleast 6 characters.</p>
                <FontAwesomeIcon
                  icon={faXmark}
                  onClick={() => setInvalidUser(false)}
                  className="cursor-pointer mt-[1px]"
                />
              </div>
            ) : null}

            <form
              onSubmit={handleFormSubmmission}
              className="sm426:max-w-[388px] w-full sm426:w-full sm375:w-[360px] sm350:w-[320px] flex flex-col gap-[24px]"
            >
              <Input
                label="Email"
                type="email"
                placeholder="Example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
              />

              <Input
                label="Password"
                type="text"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
              />
              <button
                aria-label="Forgot Password?"
                className="w-full text-[#1E4AE9] text-[16px] font-Roboto text-right"
              >
                Forgot Password?
              </button>
              <button
                aria-label="Sign in"
                className="w-full bg-[#162D3A] dark:bg-blue text-center px-3 py-2 rounded-xl text-[#FFFFFF] text-[20px] font-Roboto"
              >
                {isLogging ? (
                  <div className="flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-blue rounded-full animate-spin border-t-transparent"></div>
                  </div>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            <div className="sm426:max-w-[388px] w-full sm426:w-full sm375:w-[360px] sm350:w-[320px] flex items-center my-4 font-Roboto break-words">
              <div className="w-full flex-grow border-t border-gray-300"> </div>
              <span className="min-w-fit mx-3 text-[#294957] font-normal dark:text-white hidden sm426:inline">
                {" "}
                Or{" "}
              </span>
              <span className="min-w-fit mx-3 text-[#294957] font-normal dark:text-white sm426:hidden">
                {" "}
                Or sign in with{" "}
              </span>
              <div className="w-full flex-grow border-t border-gray-300"> </div>
            </div>

            {/* Google and/ Facebook Buttons */}
            <SocialLoginAuthentication setServerError={setServerError}/>

            <div className="font-Roboto text-[16px] mt-5 break-words">
              <p className="text-[#313957] dark:text-white">
                Don't you have an account?{" "}
                <Link
                  href="/signup"
                  onClick={onSignUpClick}
                  className="text-[#1E4AE9] hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>

            <p className="sm426:mt-0 mt-8 bottom-0 font-Roboto text-[16px] font-normal text-[#959CB6] break-words sm426:absolute">
              © 2023 ALL RIGHTS RESERVED
            </p>
          </div>

          {/* Image */}
          <div className="sm426:h-[1076px] sm426:w-[48%] sm375:w-[360px] sm350:w-[320px] w-[300px] h-[180px] sm426:order-2 sm426:mt-0 order-1 mt-4">
            <img
              alt="Art"
              src="/Art.svg"
              className="w-full h-full object-cover sm426:rounded-lg rounded-[20px]"
            />
          </div>
        </div>
      </section>
    </GoogleOAuthProvider>
  );
}
